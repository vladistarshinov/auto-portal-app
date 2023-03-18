import { getArticlesUrl, getPromotionsUrl } from '@/shared/api/strapi.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getPopulateQuery } from '../libs/query.params';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private readonly http: HttpClient) { }

  public getArticles(): Observable<any> {
    return this.http.get<any>(getArticlesUrl + `?${getPopulateQuery(['image', 'coverImage', 'tags'])}`);
  }

  public getPromotions(): Observable<any> {
    return this.http.get<any>(getPromotionsUrl + `?${getPopulateQuery(['image', 'coverImage', 'tag'])}`);
  }
  
}
