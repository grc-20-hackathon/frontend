import { Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IDictionaryOption } from '../../shared/models/dictionary-option.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddSiteDialogComponent } from '../../shared/components/add-site-dialog/add-site-dialog.component';
import { filter, finalize, switchMap, take, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IAiFormData } from './models/ia-form.interface';
import { ISiteSettingsFormData } from './models/sute-settings-form-data.interface';
import { GET_CONFIGURATION } from './graphql/query/get-configuration';
import { IGetConfiguration } from './graphql/models/get-configuration.interface';
import { ADD_SITE } from './graphql/mutation/add-site';
import { UPDATE_AI_FORM } from './graphql/mutation/update-ai-form';
import { UPDATE_SITE_SETTINGS_FORM } from './graphql/mutation/update-site-settings-form';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ConfigurationControllerService {
  public loading = signal<boolean>(true);
  public modalOptions = signal<IDictionaryOption[]>([]);
  public typeOptions = signal<IDictionaryOption[]>([]);
  public siteOptions = signal<IDictionaryOption[]>([]);
  public aiForm = signal<IAiFormData | null>(null);
  public siteSettingsForm = signal<ISiteSettingsFormData | null>(null);

  constructor(
    private readonly apollo: Apollo,
    private dialog: MatDialog
  ) {}

  init() {
    this.getConfiguration();
  }

  updateAiForm(form: IAiFormData) {
    this.loading.set(true);
    this.apollo
      .mutate<{ updateSettingsAi: IGetConfiguration }>({
        mutation: UPDATE_AI_FORM,
        variables: {
          ...form,
          id: this.aiForm()?.id,
        },
      })
      .pipe(
        take(1),
        tap(({ data }) => {
          data && this.updateConfiguration(data.updateSettingsAi);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  updateSiteSettingsForm(form: ISiteSettingsFormData) {
    this.loading.set(true);
    this.apollo
      .mutate<{ updateSettingsSite: IGetConfiguration }>({
        mutation: UPDATE_SITE_SETTINGS_FORM,
        variables: { ...form, id: this.aiForm()?.id },
      })
      .pipe(
        take(1),
        tap(({ data }) => {
          data && this.updateConfiguration(data.updateSettingsSite);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  addSite() {
    this.loading.set(true);
    this.dialog
      .open(AddSiteDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .pipe(
        filter((url: string) => !!url),
        switchMap((url: string) =>
          this.apollo.mutate<{ addSite: IGetConfiguration }>({
            mutation: ADD_SITE,
            variables: { url },
          })
        ),
        tap(({ data }) => {
          data && this.updateConfiguration(data.addSite);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private getConfiguration() {
    this.apollo
      .query<{ configuration: IGetConfiguration }>({
        query: GET_CONFIGURATION,
      })
      .pipe(
        take(1),
        tap(({ data }) => {
          data && this.updateConfiguration(data.configuration);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateConfiguration(data: IGetConfiguration) {
    this.aiForm.set(data.settingsAi);
    this.siteSettingsForm.set(data.settingsSite);
    this.modalOptions.set(data.settingsAi.aiModels ?? []);
    this.typeOptions.set(data.settingsAi.aiTypes ?? []);
    this.siteOptions.set(data.settingsSite.sites ?? []);
  }
}
