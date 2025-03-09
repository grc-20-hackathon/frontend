import { v4 as uuidv4 } from 'uuid';
import { ITypeDto } from '../models/dto/type-dto.interface';

export const DefaultCover: ITypeDto = {
  id: uuidv4(),
  property: 'Cover',
  value: '',
};

export const DefaultAvatar: ITypeDto = {
  id: uuidv4(),
  property: 'Avatar',
  value: '',
};
