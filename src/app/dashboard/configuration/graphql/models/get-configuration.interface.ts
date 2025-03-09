import { ISiteSettingsFormData } from '../../models/sute-settings-form-data.interface';
import { IAiFormData } from '../../models/ia-form.interface';

export interface IGetConfiguration {
  settingsAi: IAiFormData;
  settingsSite: ISiteSettingsFormData;
}
