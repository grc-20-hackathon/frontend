import { IType } from './type.interface';
import { IProject } from './project.interface';
import { IEntity } from './entity.interface';
import { ILocation } from './location.interface';
import { ISalary } from './selary.interface';

export interface IJobOpening {
  id: string;
  geoId: string | null;
  isLoading: boolean;
  canPublish: boolean;
  isSelected: boolean;
  name: IType;
  description: IType;
  content: { property: string; value: string[] };
  types: IType<IType<IEntity>[]> | null;
  avatar: IType<IType> | null;
  cover: IType<IType> | null;
  skills: IType<IType<IEntity>[]> | null;
  roles: IType<IType<IEntity>[]> | null;
  employmentTypes: IType<IType<IEntity>[]> | null;
  project: IType<IProject> | null;
  salaryMin: ISalary | null;
  salaryMax: ISalary | null;
  publishDate: IType | null;
  location: IType<ILocation> | null;
  relatedSpaces: IType<IType<IEntity>[]> | null;
  webURL: IType | null;
}
