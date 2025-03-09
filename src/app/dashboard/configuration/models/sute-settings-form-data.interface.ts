import { ITitleUrlXPath } from './title-url-x-path.interface';
import { IDictionaryOption } from '../../../shared/models/dictionary-option.interface';

export interface ISiteSettingsFormData {
  isGenerateAutomatically: boolean;
  siteId: string;
  titleUrlXPath: ITitleUrlXPath;
  sites?: IDictionaryOption[];
}
