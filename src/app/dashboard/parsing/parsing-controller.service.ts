import { Injectable, signal } from '@angular/core';
import { IParsedSite } from './models/parsed-data.interface';
import { Apollo } from 'apollo-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GET_PARSED_DATA } from './graphql/query/get-parsed-data';
import { finalize, tap } from 'rxjs';
import { SEND_TO_DB } from './graphql/mutation/send-to-db';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class ParsingControllerService {
  public loading = signal<boolean>(false);
  public parsedSites = signal<IParsedSite[]>([]);

  constructor(private readonly apollo: Apollo) {}

  parse() {
    this.loading.set(true);
    this.apollo
      .query<{ parsedData: IParsedSite[] }>({ query: GET_PARSED_DATA })
      .pipe(
        tap(({ data }) => {
          data && this.parsedSites.set(data.parsedData);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  sendToDb(id: number) {
    this.loading.set(true);
    this.apollo
      .mutate<{ sendToDb: IParsedSite[] }>({
        mutation: SEND_TO_DB,
        variables: { id },
      })
      .pipe(
        tap(({ data }) => {
          data && this.parsedSites.set(data.sendToDb);
        }),
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
