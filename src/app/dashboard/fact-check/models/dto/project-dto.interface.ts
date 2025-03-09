import { ITypeDto } from './type-dto.interface';

export interface IProjectDto {
  name: ITypeDto;
  description: ITypeDto;
  website: ITypeDto;
  x: ITypeDto;
  avatar?: ITypeDto;
  cover?: ITypeDto;
}
