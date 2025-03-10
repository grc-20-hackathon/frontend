import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearchResult } from '../models/result.interface';
import { IJobOpening } from '../models/job-opening.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(private readonly http: HttpClient) {}

  search(search: string): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(
      `https://api-testnet.grc-20.thegraph.com/search?q=${search}`
    );
  }

  transfer(
    jobs: Omit<
      IJobOpening,
      'canPublish' | 'isSelected' | 'geoId' | 'isLoading'
    >[]
  ) {
    return this.http.post(
      'http://localhost:3000/transfer',
      { data: jobs },
      {
        headers: {
          Authorization: 'Basic' + btoa('kakaton-user' + 'password123'),
        },
      }
    );
  }
}
