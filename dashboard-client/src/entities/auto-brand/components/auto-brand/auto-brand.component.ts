import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auto-brand',
  templateUrl: './auto-brand.component.html',
  styleUrls: ['./auto-brand.component.scss']
})
export class AutoBrandComponent implements OnInit {
  @Input()
  public brand!: string;

  @Output()
  public brandSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public handleSelect(brand: string) {
    this.brandSelect.next(brand)
  }

}
