import { ITitleUrlXPath } from './title-url-x-path.interface';

export interface ISiteSettingsForm {
  id: string;
  isGenerateAutomatically: boolean;
  siteId: string;
  titleUrlXPath: ITitleUrlXPath;
}
