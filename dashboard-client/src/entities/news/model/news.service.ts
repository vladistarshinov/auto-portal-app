import { getArticlesUrl, getPromotionsUrl } from '@/shared/api/strapi.config';
import { IArticleResponse, IPromotionResponse } from '@/shared/api/types/news.types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getPopulateQuery } from '../libs/query.params';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private readonly http: HttpClient) { }

  public getArticles(): Observable<IArticleResponse> {
    return this.http.get<IArticleResponse>(getArticlesUrl + `?${getPopulateQuery(['image', 'coverImage', 'tags'])}`);
  }

  public getPromotions(): Observable<IPromotionResponse> {
    return this.http.get<IPromotionResponse>(getPromotionsUrl + `?${getPopulateQuery(['image', 'coverImage', 'tag'])}`);
  }

}
