import { Injectable } from '@angular/core';
import { IJobOpeningDto } from '../models/dto/job-opening-dto.interface';
import { IJobOpening } from '../models/job-opening.interface';
import {
  AVATAR_TYPE_ID,
  COMPANY_TYPE_ID,
  COVER_TYPE_ID,
  CRYPTO_SPACE_ID,
  EMPLOYMENTS_TYPE_ID,
  EURO_TYPE_ID,
  JOB_OPENING_COVER_ID,
  JOB_OPENING_TYPE_ID,
  LOCATION_TYPE_ID,
  POUND_STERLING_TYPE_ID,
  PROJECT_TYPE_ID,
  PUBLISH_DATE_TYPE_ID,
  RELATED_SPACES_TYPE_ID,
  ROLES_TYPE_ID,
  SALARY_MAX_TYPE_ID,
  SALARY_MIN_TYPE_ID,
  SKILLS_TYPE_ID,
  TYPES_ID,
  US_DOLLAR_TYPE_ID,
  WEB_URL_TYPE_ID,
  WEBSITE_TYPE_ID,
  X_TYPE_ID,
} from '../consts/ids';
import { v4 as uuidv4 } from 'uuid';
import { ITypeDto } from '../models/dto/type-dto.interface';
import { IProjectDto } from '../models/dto/project-dto.interface';
import { DefaultAvatar, DefaultCover } from '../consts/default';
import { IType } from '../models/type.interface';
@Injectable({
  providedIn: 'root',
})
export class FactCheckConverterService {
  fromDtoArray(dto: { jobOpening: IJobOpeningDto }[]): IJobOpening[] {
    return dto.map((dtoItem) => this.fromDto(dtoItem.jobOpening));
  }

  toPublish(
    job: IJobOpening
  ): Omit<IJobOpening, 'canPublish' | 'isSelected' | 'geoId' | 'isLoading'> {
    return {
      id: job.id,
      name: job.name,
      description: job.description,
      content: job.content,
      types: job.types,
      avatar: job.avatar,
      cover: job.cover,
      skills: job.skills,
      roles: job.roles,
      employmentTypes: job.employmentTypes,
      project: job.project,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      publishDate: job.publishDate,
      location: null,
      relatedSpaces: job.relatedSpaces,
      webURL: job.webURL,
    };
  }

  private fromDto(dto: IJobOpeningDto): IJobOpening {
    return {
      isLoading: true,
      canPublish: true,
      isSelected: false,
      id: dto.id ?? uuidv4(),
      geoId: dto.geoId ?? null,
      name: this.enrichDataWithId(dto.name),
      description: this.enrichDataWithId(dto.description),
      content: dto.content,
      skills: this.setGeoId(this.enrichDataWithId(dto.skills), SKILLS_TYPE_ID),
      roles: this.setGeoId(this.enrichDataWithId(dto.roles), ROLES_TYPE_ID),
      employmentTypes: this.setGeoId(
        this.enrichDataWithId(dto.employmentTypes),
        EMPLOYMENTS_TYPE_ID
      ),
      relatedSpaces: this.getRelatedSpaces(),
      types: this.getJobOpeningTypes(),
      salaryMin: this.getSalary(dto.salaryMin, SALARY_MIN_TYPE_ID),
      salaryMax: this.getSalary(dto.salaryMax, SALARY_MAX_TYPE_ID),
      webURL: this.setGeoId(this.enrichDataWithId(dto.webURL), WEB_URL_TYPE_ID),
      publishDate: this.setGeoId(
        this.enrichDataWithId(dto.publishDate),
        PUBLISH_DATE_TYPE_ID
      ),
      cover: this.getImgData(DefaultCover, COVER_TYPE_ID, JOB_OPENING_COVER_ID),
      avatar: this.getImgData(DefaultAvatar, AVATAR_TYPE_ID),
      location: this.setGeoId(
        this.enrichDataWithId(dto.location),
        LOCATION_TYPE_ID
      ),
      project: this.getProject(dto.project),
    };
  }

  private setGeoId(data: any, geoId: string): any {
    if (!data) {
      return data;
    }
    return {
      ...data,
      geoId,
    };
  }

  private enrichDataWithId(data: any): any {
    if (typeof data !== 'object' || data === null || data === undefined) {
      return data ?? null;
    }

    if ('value' in data) {
      return {
        ...data,
        id: data.id ?? uuidv4(),
        isSelected: true,
        value: this.enrichDataWithId(data.value),
      };
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.enrichDataWithId(item));
    }

    const copiedData = { ...data, id: data.id ?? uuidv4() };

    for (const key in copiedData) {
      if (copiedData.hasOwnProperty(key)) {
        copiedData[key] = this.enrichDataWithId(copiedData[key]);
      }
    }

    return copiedData;
  }

  private getImgData(
    data: ITypeDto | undefined,
    attrGeoId: string,
    imageGeoId: string | null = null
  ): IType<IType> | null {
    if (!data) {
      return null;
    }
    return {
      ...data,
      id: uuidv4(),
      isSelected: true,
      geoId: attrGeoId,
      value: {
        id: uuidv4(),
        isSelected: true,
        property: 'Image',
        geoId: imageGeoId,
        value: data?.value,
      },
    };
  }

  private getSalary(salary: any, geoId: string) {
    return Boolean(salary)
      ? {
          ...salary,
          geoId,
          id: salary?.id ?? uuidv4(),
          isSelected: true,
          currency: {
            id: uuidv4(),
            isSelected: true,
            value: salary.currency,
            property: 'Currency',
            geoId: this.getCurrencyGeoId(salary.currency),
          },
        }
      : null;
  }

  private getRelatedSpaces() {
    return {
      id: uuidv4(),
      isSelected: true,
      property: 'Related spaces',
      geoId: RELATED_SPACES_TYPE_ID,
      value: [
        {
          id: uuidv4(),
          isSelected: true,
          property: 'Space',
          geoId: CRYPTO_SPACE_ID,
          value: {
            isSelected: true,
            id: uuidv4(),
            name: {
              id: uuidv4(),
              isSelected: true,
              property: 'Name',
              value: 'Cripto',
            },
            description: {
              id: uuidv4(),
              isSelected: true,
              property: 'Description',
              value: 'Cripto Descript',
            },
          },
        },
      ],
    };
  }

  private getJobOpeningTypes() {
    return {
      id: uuidv4(),
      isSelected: true,
      geoId: TYPES_ID,
      property: 'Types',
      value: [
        {
          id: uuidv4(),
          isSelected: true,
          geoId: JOB_OPENING_TYPE_ID,
          property: 'Type',
          value: {
            id: uuidv4(),
            isSelected: true,
            geoId: JOB_OPENING_TYPE_ID,
            property: 'Job Opening',
            name: {
              id: uuidv4(),
              isSelected: true,
              property: 'Name',
              value: 'Job Opening',
            },
            description: {
              id: uuidv4(),
              isSelected: true,
              property: 'Description',
              value:
                'An available position within a company or organization that is currently seeking a qualified candidate to fill it.',
            },
          },
        },
      ],
    };
  }

  private getProject(project: ITypeDto<IProjectDto>): any {
    if (!project) {
      return null;
    }
    return {
      ...project,
      geoId: PROJECT_TYPE_ID,
      property: 'Project',
      value: {
        name: this.enrichDataWithId(project.value.name),
        description: this.enrichDataWithId(project.value.description),
        cover: this.getImgData(project.value.cover, COVER_TYPE_ID),
        avatar: this.getImgData(project.value.avatar, AVATAR_TYPE_ID),
        website: this.setGeoId(
          this.enrichDataWithId(project.value.website),
          WEBSITE_TYPE_ID
        ),
        x: this.setGeoId(this.enrichDataWithId(project.value.x), X_TYPE_ID),
        types: this.getProjectTypes(),
      },
    };
  }

  private getProjectTypes() {
    return {
      id: uuidv4(),
      isSelected: true,
      geoId: TYPES_ID,
      property: 'Types',
      value: [
        {
          id: uuidv4(),
          isSelected: true,
          geoId: PROJECT_TYPE_ID,
          property: 'Type',
          value: {
            id: uuidv4(),
            isSelected: true,
            geoId: PROJECT_TYPE_ID,
            property: 'Project',
            name: {
              id: uuidv4(),
              isSelected: true,
              property: 'Name',
              value: 'Project',
            },
            description: {
              id: uuidv4(),
              isSelected: true,
              property: 'Description',
              value:
                'A project is a planned endeavor with specific goals, tasks, and a timeline aimed at achieving a particular outcome.',
            },
          },
        },
        {
          id: uuidv4(),
          isSelected: true,
          geoId: COVER_TYPE_ID,
          property: 'Type',
          value: {
            id: uuidv4(),
            isSelected: true,
            geoId: COMPANY_TYPE_ID,
            property: 'Company',
            name: {
              id: uuidv4(),
              isSelected: true,
              property: 'Name',
              value: 'Company',
            },
            description: {
              id: uuidv4(),
              isSelected: true,
              property: 'Description',
              value:
                'A company is a legally recognized organization that provides goods or services to customers, typically for profit, and operates within a structured framework to achieve business objectives.',
            },
          },
        },
      ],
    };
  }

  private getCurrencyGeoId(dto: 'USD' | 'EUR' | 'GBP'): string {
    switch (dto) {
      case 'USD':
        return US_DOLLAR_TYPE_ID;
      case 'EUR':
        return EURO_TYPE_ID;
      case 'GBP':
        return POUND_STERLING_TYPE_ID;
    }
  }
}
