import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {
  MatLabel,
  MatOptgroup,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { SiteSettingsFormFieldsEnum } from '../../consts/site-settings-form-fields.enum';
import { ISiteSettingsForm } from '../../models/site-settings-form.interface';
import { IDictionaryOption } from '../../../../shared/models/dictionary-option.interface';
import { MatInput } from '@angular/material/input';
import { pairwise, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { XPathsEnum } from '../../consts/x-paths.enum';
import { ISiteSettingsFormData } from '../../models/sute-settings-form-data.interface';
import { isEqual } from 'lodash';

@UntilDestroy()
@Component({
  selector: 'grc-site-settings-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOptgroup,
    MatOption,
    MatInput,
    MatIcon,
    MatButton,
    MatSlideToggle,
  ],
  templateUrl: './site-settings-form.component.html',
  styleUrl: './site-settings-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteSettingsFormComponent implements OnInit {
  @Input() formData!: Signal<ISiteSettingsFormData | null>;
  @Input() siteOptions!: IDictionaryOption[];

  @Output() addSite = new EventEmitter<void>();
  @Output() formValueChange = new EventEmitter<ISiteSettingsFormData>();

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.updateFormAfterFormDataChange();
  }

  ngOnInit() {
    this.createForm();
    this.subscribeToFormChanges();
  }

  get xPaths(): FormGroup {
    return this.form.get(SiteSettingsFormFieldsEnum.TitleUrlXPath) as FormGroup;
  }

  private createForm() {
    const formData = this.formData();
    const titleUrlXPath = formData?.titleUrlXPath;
    this.form = this.fb.group(
      {
        [SiteSettingsFormFieldsEnum.IsGenerateAutomatically]: this.fb.control(
          formData?.isGenerateAutomatically ?? false,
          { updateOn: 'change' }
        ),
        [SiteSettingsFormFieldsEnum.SiteId]: this.fb.control(
          formData?.siteId ?? null
        ),
        [SiteSettingsFormFieldsEnum.TitleUrlXPath]: this.fb.group({
          [XPathsEnum.JobTitleXPath]: this.fb.control(
            titleUrlXPath?.jobTitleXPath ?? ''
          ),
          [XPathsEnum.JobDescriptionXPath]: this.fb.control(
            titleUrlXPath?.jobDescriptionXPath ?? ''
          ),
          [XPathsEnum.RequiredSkillsXPath]: this.fb.control(
            titleUrlXPath?.requiredSkillsXPath ?? ''
          ),
          [XPathsEnum.WorkFormatXPath]: this.fb.control(
            titleUrlXPath?.workFormatXPath ?? ''
          ),
          [XPathsEnum.LocationXPath]: this.fb.control(
            titleUrlXPath?.locationXPath ?? ''
          ),
          [XPathsEnum.SalaryXPath]: this.fb.control(
            titleUrlXPath?.salaryXPath ?? ''
          ),
          [XPathsEnum.PublicationDateXPath]: this.fb.control(
            titleUrlXPath?.publicationDateXPath ?? ''
          ),
        }),
      },
      { updateOn: 'blur' }
    );
  }

  private subscribeToFormChanges() {
    this.form.valueChanges
      .pipe(
        pairwise<ISiteSettingsForm>(),
        tap(([oldForm, newForm]: [ISiteSettingsForm, ISiteSettingsForm]) => {
          if (isEqual(oldForm, newForm)) {
            this.formValueChange.emit(newForm);
          }
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateFormAfterFormDataChange() {
    effect(() => {
      const formValue = this.formData();
      if (formValue) {
        this.form.patchValue(formValue, { emitEvent: false, onlySelf: false });
      }
    });
  }

  protected readonly SiteSettingsFormFieldsEnum = SiteSettingsFormFieldsEnum;
  protected readonly XPathsEnum = XPathsEnum;
}
