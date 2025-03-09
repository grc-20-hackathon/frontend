import { ITypeDto } from './type-dto.interface';

export interface ISalaryDto extends ITypeDto<number> {
  currency: 'USD' | 'EUR' | 'GBP';
}
