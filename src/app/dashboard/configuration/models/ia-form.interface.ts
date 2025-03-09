import { IDictionaryOption } from '../../../shared/models/dictionary-option.interface';

export interface IAiFormData {
  id: string;
  aiModelId: string | null;
  aiTypeId: string | null;
  apiKey: string;
  temperature: number | null;
  maxTokens: number | null;
  promptForXPath: string;
  promptForXPathData: string;
  aiTypes?: IDictionaryOption[];
  aiModels?: IDictionaryOption[];
}
