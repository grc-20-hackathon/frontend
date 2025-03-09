export interface ITypeDto<T = string> {
  id?: string;
  property: string;
  value: T;
}
