import { Component, OnInit, Signal } from '@angular/core';
import { ConfigurationControllerService } from './configuration-controller.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { IDictionaryOption } from '../../shared/models/dictionary-option.interface';
import { AiFormComponent } from './components/ai-form/ai-form.component';
import { SiteSettingsFormComponent } from './components/site-settings-form/site-settings-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { IAiFormData } from './models/ia-form.interface';
import { ISiteSettingsFormData } from './models/sute-settings-form-data.interface';

@Component({
  selector: 'grc-configuration',
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    AiFormComponent,
    SiteSettingsFormComponent,
  ],
  providers: [ConfigurationControllerService],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  standalone: true,
})
export class ConfigurationComponent implements OnInit {
  loading!: Signal<boolean>;
  modelOptions!: Signal<IDictionaryOption[]>;
  typeOptions!: Signal<IDictionaryOption[]>;
  siteOptions!: Signal<IDictionaryOption[]>;

  aiForm!: Signal<IAiFormData | null>;
  siteSettingsForm!: Signal<ISiteSettingsFormData | null>;

  constructor(private readonly controller: ConfigurationControllerService) {}

  ngOnInit() {
    this.initVariables();
    this.controller.init();
  }

  aiFormChange(form: IAiFormData) {
    this.controller.updateAiForm(form);
  }

  siteSettingsFormChange(form: ISiteSettingsFormData) {
    this.controller.updateSiteSettingsForm(form);
  }

  addSite() {
    this.controller.addSite();
  }

  private initVariables() {
    this.loading = this.controller.loading;
    this.modelOptions = this.controller.modalOptions;
    this.typeOptions = this.controller.typeOptions;
    this.siteOptions = this.controller.siteOptions;
    this.aiForm = this.controller.aiForm;
    this.siteSettingsForm = this.controller.siteSettingsForm;
  }
}
