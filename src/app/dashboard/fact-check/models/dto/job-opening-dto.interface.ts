import { ITypeDto } from './type-dto.interface';
import { IEntityDto } from './entity-dto.interface';
import { IProjectDto } from './project-dto.interface';
import { ILocationDto } from './location-dto.interface';
import { ISalaryDto } from './salary-dto.interface';

export interface IJobOpeningDto {
  id: string;
  name: ITypeDto;
  description: ITypeDto;
  content: { property: string; value: string[] };
  skills: ITypeDto<ITypeDto<IEntityDto>[]>;
  roles: ITypeDto<ITypeDto<IEntityDto>[]>;
  employmentTypes: ITypeDto<ITypeDto<IEntityDto>[]>;
  project: ITypeDto<IProjectDto>;
  publishDate: ITypeDto;
  webURL: ITypeDto;
  geoId?: string;
  avatar?: ITypeDto;
  cover?: ITypeDto;
  salaryMin?: ISalaryDto;
  salaryMax?: ISalaryDto;
  location?: ITypeDto<ILocationDto>;
  relatedSpaces?: ITypeDto<ITypeDto<IEntityDto>[]>;
}
