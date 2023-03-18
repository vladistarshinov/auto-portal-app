import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input()
  public card!: any;
  constructor() { }

  ngOnInit(): void {
  }

  get type(): string {
    return 'tags' in this.card.attributes ? 'Новость' : 'Акция';
  }

  public getImageUrl(url: string): string {
    return 'http://localhost:1337' + url;
  }

}
