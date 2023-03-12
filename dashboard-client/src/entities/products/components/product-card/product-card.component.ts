import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input()
  public product!: any;
  constructor() { }

  ngOnInit(): void {
  }

  public getImageUrl(url: string): string {
    return 'http://localhost:4201' + url;
  }

}
