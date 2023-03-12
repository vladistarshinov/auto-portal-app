import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-card',
  templateUrl: './auto-card.component.html',
  styleUrls: ['./auto-card.component.scss']
})
export class AutoCardComponent implements OnInit {
  @Input()
  public auto!: any;
  constructor() { }

  ngOnInit(): void {
  }

  public getImageUrl(url: string): string {
    return 'http://localhost:4201' + url;
  }

}
