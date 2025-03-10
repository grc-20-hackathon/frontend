import { Injectable } from '@angular/core';
import { SearchApiService } from './search-api.service';
import { IType } from '../models/type.interface';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IResult, ISearchResult } from '../models/result.interface';
import { IEntity } from '../models/entity.interface';
import {
  AVATAR_TYPE_ID,
  COVER_TYPE_ID,
  EMPLOYMENT_TYPE_ID,
  JOB_OPENING_TYPE_ID,
  PROJECT_TYPE_ID,
  ROLE_TYPE_ID,
  SKILL_TYPE_ID,
  TEXT_BLOCK_TYPE_ID,
  WEB_URL_TYPE_ID,
  WEBSITE_TYPE_ID,
} from '../consts/ids';
import { IJobOpening } from '../models/job-opening.interface';
import { normalizeSearchTerm } from '../helpers/normolize-search';
import { Apollo, ApolloBase } from 'apollo-angular';
import { GET_ENTITY_BY_ID } from '../graphql/query/get-entity-by-id';
import { IGetEntityData } from '../graphql/models/get-entity-by-id-data.interface';
import { trim } from 'lodash';
import { IValidateProjectResults } from '../models/validate-project-results';
import { ApolloQueryResult } from '@apollo/client/core/types';

@Injectable({
  providedIn: 'root',
})
export class ValidateDataService {
  private geoApolloClient: ApolloBase<any>;

  constructor(
    private readonly searchApi: SearchApiService,
    private readonly apollo: Apollo
  ) {
    this.geoApolloClient = this.apollo.use('geoClient');
  }

  validate(data: IJobOpening) {
    return this.validateJobOpening(data);
  }

  private validateJobOpening(jobOpening: IJobOpening): Observable<IJobOpening> {
    //@ts-ignore
    return combineLatest([
      this.validateJob(jobOpening.name, jobOpening?.webURL?.value),
      this.validateSkills(jobOpening?.skills?.value),
      this.validateRoles(jobOpening?.roles?.value),
      this.validateEmploymentTypes(jobOpening?.employmentTypes?.value),
      this.validateProject(jobOpening?.project?.value?.name),
    ]).pipe(
      map(([job, skills, roles, employmentTypes, projectResults]) => {
        return {
          ...jobOpening,
          name: job.jobName,
          geoId: job.geoId ?? jobOpening.geoId,
          isLoading: false,
          canPublish: !job.geoId,
          avatar: {
            ...jobOpening.avatar,
            value: projectResults?.geoId
              ? {
                  ...jobOpening.avatar?.value,
                  geoId: projectResults?.avatarImageGeoId ?? null,
                }
              : { ...jobOpening.avatar?.value },
          },
          skills: {
            ...jobOpening.skills,
            value: skills,
          },
          roles: {
            ...jobOpening.roles,
            value: roles,
          },
          employmentTypes: {
            ...jobOpening.employmentTypes,
            value: employmentTypes,
          },
          location: {
            ...jobOpening.location,
            value: { ...location },
          },
          project: {
            ...jobOpening.project,
            options: projectResults?.options,
            value: {
              ...jobOpening.project?.value,
              geoId: projectResults?.geoId ?? null,

            },
          },
        };
      })
    );
  }

  private validateJob(
    jobName: IType,
    webURL: string | undefined
  ): Observable<{ jobName: IType; geoId: string | null }> {
    let result: { jobName: IType; geoId: string | null } = {
      jobName: jobName,
      geoId: null,
    };

    if (!jobName?.value) {
      return of(result);
    }

    return this.validateType(jobName, TEXT_BLOCK_TYPE_ID).pipe(
      tap((searchedValues) => {
        if (searchedValues.length > 0) {
          result = {
            ...result,
            jobName: {
              ...result.jobName,
              options: searchedValues,
            },
          };
        }
      }),
      switchMap(() => this.validateType(jobName, JOB_OPENING_TYPE_ID)),
      switchMap((searchedValues) => {
        if (searchedValues && searchedValues.length > 0) {
          const entities$ = [];
          for (const searchedValue of searchedValues) {
            entities$.push(this.getEntityById(searchedValue.id));
          }
          return combineLatest(entities$);
        }
        return of([]);
      }),
      map((entities) => {
        for (const entity of entities) {
          if (entity.data?.entity?.currentVersion?.version?.triples?.nodes) {
            for (const node of entity.data.entity.currentVersion.version.triples
              .nodes) {
              if (
                node?.attributeVersion?.entityId === WEB_URL_TYPE_ID &&
                webURL === node.textValue
              ) {
                result = {
                  ...result,
                  geoId: entity.data.entity.id as string,
                };
                break;
              }
            }
          }
        }
        return result;
      }),
      catchError(() => of(result))
    );
  }

  private validateSkills(
    skills: IType<IEntity>[] | undefined | null
  ): Observable<IType<IEntity>[]> {
    if (!skills || skills.length < 1) {
      return of([]);
    }
    return combineLatest(
      skills.map((skill) => {
        if (!skill.value) {
          return of(skill);
        }
        return this.validateType(skill.value.name, SKILL_TYPE_ID).pipe(
          map((searchedValues) => {
            if (searchedValues.length === 1) {
              return {
                ...skill,
                geoId: searchedValues[0].id,
                options: searchedValues,
              };
            }
            return {
              ...skill,
              options: searchedValues,
            };
          })
        );
      })
    );
  }

  private validateRoles(
    roles: IType<IEntity>[] | null | undefined
  ): Observable<IType<IEntity>[]> {
    if (!roles || roles.length < 1) {
      return of([]);
    }
    return combineLatest(
      roles.map((role) => {
        if (!role.value) {
          return of(role);
        }
        return this.validateType(role.value.name, ROLE_TYPE_ID).pipe(
          map((searchedValues) => {
            if (searchedValues.length === 1) {
              return {
                ...role,
                geoId: searchedValues[0].id,
                options: searchedValues,
              };
            }
            return {
              ...role,
              options: searchedValues,
            };
          })
        );
      })
    );
  }

  private validateEmploymentTypes(
    employmentTypes: IType<IEntity>[] | null | undefined
  ): Observable<IType<IEntity>[]> {
    if (!employmentTypes || employmentTypes.length < 1) {
      return of([]);
    }
    return combineLatest(
      employmentTypes.map((employmentType) => {
        if (!employmentType.value) {
          return of(employmentType);
        }
        return this.validateType(
          employmentType.value.name,
          EMPLOYMENT_TYPE_ID
        ).pipe(
          map((searchedValues) => {
            if (searchedValues.length === 1) {
              return {
                ...employmentType,
                geoId: searchedValues[0].id,
                options: searchedValues,
              };
            }
            return {
              ...employmentType,
              options: searchedValues,
            };
          })
        );
      })
    );
  }

  private validateProject(
    projectName: IType | undefined
  ): Observable<IValidateProjectResults | null> {
    if (!projectName) {
      return of(null);
    }

    let results: IValidateProjectResults = {
      options: [],
      geoId: null,
      avatarImageGeoId: null,
      coverImageGeoId: null,
    };

    return this.validateType(projectName, PROJECT_TYPE_ID).pipe(
      map((searchedValues) => {
        if (searchedValues.length < 1) {
          return results;
        }
        return {
          ...results,
          options: [...searchedValues],
          geoId: searchedValues.length === 1 ? searchedValues[0].id : null,
        };
      }),
      switchMap((updatedResults) => {
        if (updatedResults.geoId) {
          return this.getEntityById(updatedResults.geoId).pipe(
            map((entity: ApolloQueryResult<IGetEntityData> | boolean) => {
              if (!entity || typeof entity === 'boolean') {
                return updatedResults;
              }

              const nodes =
                entity.data?.entity?.currentVersion?.version
                  ?.relationsByFromVersionId?.nodes;
              if (nodes && nodes.length > 0) {
                const coverNode = nodes.find(
                  (node) =>
                    node.typeOf?.currentVersion?.version?.entityId ===
                    COVER_TYPE_ID
                );
                const coverImageGeoId =
                  coverNode?.toEntity?.currentVersion?.version?.entityId ??
                  null;
                const avatarNode = nodes.find(
                  (node) =>
                    node.typeOf?.currentVersion?.version?.entityId ===
                    AVATAR_TYPE_ID
                );
                const avatarImageGeoId =
                  avatarNode?.toEntity?.currentVersion?.version?.entityId ??
                  null;

                return {
                  ...updatedResults,
                  coverImageGeoId,
                  avatarImageGeoId,
                };
              }
              return updatedResults;
            })
          );
        }
        return of(updatedResults);
      })
    );
  }

  private validateType(
    type: IType | undefined | null,
    typeId: string
  ): Observable<IResult[]> {
    if (!type || !type.value) {
      return of([]);
    }
    const normalizeSearch = normalizeSearchTerm(type.value);
    return this.searchApi.search(normalizeSearch).pipe(
      map((searchedValues: ISearchResult) => {
        return searchedValues.results.filter((result) =>
          this.getTypeIds(result.types).includes(typeId)
        );
      }),
      catchError(() => of([]))
    );
  }

  private getTypeIds(types: Omit<IResult, 'types'>[]) {
    return types.map((type) => trim(type.id));
  }

  private getEntityById(entityId: string) {
    const spaceId = 'PHsbZCCxokzvMxVGphntsc';
    const coverTypeId = COVER_TYPE_ID;
    const avatarTypeId = AVATAR_TYPE_ID;
    const webUrlTypeId = WEB_URL_TYPE_ID;
    const websiteTypeId = WEBSITE_TYPE_ID;
    return this.geoApolloClient.query<IGetEntityData>({
      query: GET_ENTITY_BY_ID,
      variables: {
        spaceId,
        entityId,
        coverTypeId,
        avatarTypeId,
        webUrlTypeId,
        websiteTypeId,
      },
    });
  }
}
