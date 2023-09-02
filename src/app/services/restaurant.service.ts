import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantSearchResult } from '../model/restaurantSearchResult.model';
import { map } from 'rxjs';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}

  getAll(params?: any) {
    let queryParams = {};

    if (params) {
      queryParams = {
        params: new HttpParams()
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
          .set(
            'filter',
            (params.filter && JSON.stringify(params.filter)) || ''
          ),
      };
    }

    return this.httpClient.get(`${baseUrl}/restaurants`, queryParams).pipe(
      map((data: any) => {
        return new RestaurantSearchResult(data);
      })
    );
  }
}
