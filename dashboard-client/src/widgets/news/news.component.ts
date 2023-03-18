import { NewsService } from '@/entities/news/model/news.service';
import { Component, OnInit } from '@angular/core';
import {OwlOptions, SlidesOutputData} from 'ngx-owl-carousel-o';
import { zip } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public articleList = [];
  public promotionList = [];
  public newsList = [];
  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="../../assets/carousel-arrows/arrow-left-btn.svg" alt="" />',
      '<img src="../../assets/carousel-arrows/arrow-right-btn.svg" alt="" />'
    ],
    autoWidth: true,
    nav: true,
  };
  public activeSlides!: SlidesOutputData;
  constructor(private readonly newsService: NewsService) { }

  ngOnInit(): void {
    zip(
      this.newsService.getArticles(),
      this.newsService.getPromotions())
      .subscribe((res: any) => {
        this.articleList = res[0].data;
        this.promotionList = res[1].data;
        this.newsList = this.articleList.concat(this.promotionList).concat(this.articleList.concat(this.promotionList));
        console.log(this.newsList);
      })
  }

  public getData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

}
