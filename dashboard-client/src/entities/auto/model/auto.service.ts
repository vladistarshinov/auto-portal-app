import { getAutosUrl } from '@/shared/api/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as qs from 'qs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private readonly http: HttpClient) { }

  public getAll(page: number, rows: number, sort?: string): Observable<any> {
    let params: HttpParams = new HttpParams({
      fromString: qs.stringify({
        page,
        limit: rows,
        sort,
      }),
    })
    console.log(params);
    return this.http.post<any>(getAutosUrl, { params });
  }
}
