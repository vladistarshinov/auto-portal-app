import { IArticleContent, IPromotionContent, ITagContent } from '@/shared/api/types/news.types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input()
  public card: IArticleContent | IPromotionContent | any;
  constructor() { }

  ngOnInit(): void {
  }

  get type(): string {
    return 'tags' in this.card.attributes ? 'Новость' : 'Акция';
  }

  get hashtags(): string {
    return 'tags' in this.card.attributes
      ? this.card?.attributes?.tags?.data?.map((h: ITagContent) => h.attributes.title).join(' ')
      : this.card?.attributes?.tag?.data.attributes.title;
  }

  public getImageUrl(url: string): string {
    return 'http://localhost:1337' + url;
  }

}
