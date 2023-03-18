import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-brand',
  templateUrl: './auto-brand.component.html',
  styleUrls: ['./auto-brand.component.scss']
})
export class AutoBrandComponent implements OnInit {
  @Input()
  brand!: string;

  constructor() { }

  ngOnInit(): void {
  }

  public handleSelect() {

  }

}
