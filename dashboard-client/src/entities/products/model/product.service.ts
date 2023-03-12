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

  public getProducts(page: number, rows: number, sort?: string): Observable<any> {
    let params: HttpParams = new HttpParams({
      fromString: qs.stringify({
        page,
        limit: rows,
        sort,
      }),
    })
    return this.http.post<any>(getProductsUrl, { params });
  }

}
