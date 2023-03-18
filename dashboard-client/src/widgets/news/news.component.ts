import { NewsService } from '@/entities/news/model/news.service';
import { IArticleContent, IArticleResponse, IPromotionContent, IPromotionResponse } from '@/shared/api/types/news.types';
import { Component, OnInit } from '@angular/core';
import {OwlOptions, SlidesOutputData} from 'ngx-owl-carousel-o';
import { zip } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public articleList: IArticleContent[] = [];
  public promotionList: IPromotionContent[] = [];
  public newsList: (IArticleContent | IPromotionContent)[] = [];
  protected customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<img src="../../assets/carousel-arrows/arrow-left-btn.svg" alt="" />',
      '<img src="../../assets/carousel-arrows/arrow-right-btn.svg" alt="" />'
    ],
    autoWidth: true,
    nav: true,
  };
  protected activeSlides!: SlidesOutputData;
  constructor(private readonly newsService: NewsService) { }

  ngOnInit(): void {
    zip(
      this.newsService.getArticles(),
      this.newsService.getPromotions())
      .subscribe((res: [IArticleResponse, IPromotionResponse]) => {
        this.articleList = res[0].data;
        this.promotionList = res[1].data;
        this.newsList = [...this.articleList, ...this.promotionList];
      })
  }

  public getData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

}
