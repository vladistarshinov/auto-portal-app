import { getAutoBrandsUrl } from '@/shared/api/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoBrandService {

  constructor(private readonly http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(getAutoBrandsUrl);
  }
}
