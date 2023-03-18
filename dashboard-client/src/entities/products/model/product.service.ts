import { getProductsUrl } from '@/shared/api/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  public getProducts(
    page: number,
    rows: number,
    sort?: string,
    filters?: { column: string; value: string }[],
    searchTerm?: string
  ): Observable<any> {
    let filterMap = filters?.reduce(
      (obj: {}, item: { column: string; value: string }) =>
        Object.assign(obj, { [item.column]: item.value }), {}
    );

    let params: HttpParams = new HttpParams({
      fromString: qs.stringify({
        page,
        limit: rows,
        sort,
        search: searchTerm
      }),
    })
    return this.http.post<any>(getProductsUrl, filterMap, { params });
  }

}
