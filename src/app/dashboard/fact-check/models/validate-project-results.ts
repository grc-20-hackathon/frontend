import { IResult } from './result.interface';

export interface IValidateProjectResults {
  options: IResult[] | [];
  geoId: string | null;
  avatarImageGeoId: string | null;
  coverImageGeoId: string | null;
}
