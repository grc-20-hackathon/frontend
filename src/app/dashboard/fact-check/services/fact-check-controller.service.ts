import { Injectable, signal } from '@angular/core';
import { IJobOpening } from '../models/job-opening.interface';
import { SearchApiService } from './search-api.service';
import { ValidateDataService } from './validate-data.service';
import { FactCheckConverterService } from './fact-check-converter.service';
import { finalize, forkJoin, map, tap } from 'rxjs';
import { Apollo, ApolloBase } from 'apollo-angular';
import { IJobOpeningDto } from '../models/dto/job-opening-dto.interface';
import { GET_DATA } from '../graphql/query/get-data';
@Injectable({
  providedIn: 'root',
})
export class FactCheckControllerService {
  public loading = signal<boolean>(false);
  public hasLoadedData = signal<boolean>(false);
  public hasSelectedJob = signal<boolean>(false);
  public jobOpeningsData = signal<IJobOpening[]>([]);

  private netApolloClient: ApolloBase<any>;

  constructor(
    private readonly searchApi: SearchApiService,
    private readonly converter: FactCheckConverterService,
    private readonly validateDataService: ValidateDataService,
    private readonly apollo: Apollo
  ) {
    this.netApolloClient = this.apollo.use('netClient');
  }

  getData(countOfJobs: number) {
    this.loading.set(true);
    this.hasLoadedData.set(true);
    this.netApolloClient
      .query<{ dtos: { jobOpening: IJobOpeningDto }[] }>({
        query: GET_DATA,
        variables: {
          count: countOfJobs,
        },
      })
      .pipe(map(({ data }) => this.converter.fromDtoArray([data.dtos[3]])))
      .subscribe((convertedJobOpening) => {
        if (!convertedJobOpening || convertedJobOpening.length === 0) {
          this.hasLoadedData.set(false);
          return;
        }

        this.validateDataService
          .validate(convertedJobOpening[0])
          .subscribe((validatedData) => {
            if (validatedData) {
              this.jobOpeningsData.set([
                ...this.jobOpeningsData(),
                validatedData,
              ]);
              this.loading.set(false);
            }
          });

        if (convertedJobOpening.length < 2) {
          this.hasLoadedData.set(false);
          return;
        }

        const validationObservables = convertedJobOpening
          .slice(1)
          .map((job) => this.validateDataService.validate(job));

        forkJoin(validationObservables).subscribe((validatedJobs) => {
          const filteredJobs = validatedJobs.filter((job) => job);
          this.jobOpeningsData.set([
            ...this.jobOpeningsData(),
            ...filteredJobs,
          ]);
          this.hasLoadedData.set(false);
        });
      });
  }

  publishAllChanged(e: boolean) {
    const changedSelection = this.jobOpeningsData().map((job) =>
      job.canPublish ? { ...job, isSelected: e } : job
    );
    this.jobOpeningsData.set(changedSelection);
    this.setHasSelectedJob();
  }

  publish() {
    this.loading.set(true);
    this.hasLoadedData.set(true);
    const jobsForPublish = this.jobOpeningsData()
      .filter((job) => job.isSelected && job.canPublish)
      .map((job) => this.getAllSelectedFields(job))
      .map((job) => this.converter.toPublish(job));
    if (jobsForPublish.length > 0) {
      this.searchApi
        .transfer(jobsForPublish)
        .pipe(
          tap((data) => console.log('data', data)),
          finalize(() => {
            this.loading.set(false);
            this.hasLoadedData.set(false);
          })
        )
        .subscribe();
    }
  }

  jobOpeningChanged(jobOpening: IJobOpening) {
    const jobOpenings = this.jobOpeningsData().map((job) =>
      job.id === jobOpening.id ? jobOpening : job
    );
    this.jobOpeningsData.set(jobOpenings);
    this.setHasSelectedJob();
  }

  searchData(search: string) {
    this.searchApi.search(search).subscribe((data) => {
      console.log('searchData', data);
    });
  }

  private setHasSelectedJob() {
    const hasSelectedJob = this.jobOpeningsData().some((job) => job.isSelected);
    this.hasSelectedJob.set(hasSelectedJob);
  }

  private getAllSelectedFields(job: IJobOpening): IJobOpening {
    const result: Partial<IJobOpening> = {}; // Partial to ensure type safety

    for (const prop in job) {
      if (job.hasOwnProperty(prop)) {
        const field = job[prop as keyof IJobOpening];

        if (field && Array.isArray((field as any).value)) {
          const newPropValue = (field as any).value.filter(
            (item: any) => item.isSelected
          );
          //@ts-ignore
          result[prop as keyof IJobOpening] = { ...field, value: newPropValue };
        } else {
          //@ts-ignore
          result[prop as keyof IJobOpening] = field;
        }
      }
    }
    return result as IJobOpening;
  }
}
