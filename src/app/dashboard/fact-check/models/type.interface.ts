import { IResult } from './result.interface';

export interface IType<T = string> {
  property: string;
  id: string;
  isSelected: boolean;
  value?: T;
  geoId?: string | null;
  options?: IResult[] | any[];
}
