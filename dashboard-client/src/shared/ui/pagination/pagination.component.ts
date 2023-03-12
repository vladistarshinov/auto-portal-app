import { IMetaData } from '@/widgets/product-list/product-list.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  public limit: number = 10;
  @Input()
  public title!: string;
  @Input()
  public pageLimits!: number[];
  @Input()
  public meta!: IMetaData;
  @Output()
  public pageChange = new EventEmitter<number>();
  @Output()
  public limitChange = new EventEmitter<number>();

  public isOpenedSidebar!: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log(this.meta);
  }

  get element(): string {
    if (this.title === 'autolist')
      return 'автозапчастей';
    else
      return 'cистем';

  }


  public handleLimitChange(): void {
    this.limitChange.emit(this.limit);
  }

  public handlePaginate(page: number): void {
    this.pageChange.emit(page);
  }

}
