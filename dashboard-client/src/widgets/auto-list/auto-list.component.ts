import { AutoService } from '@/entities/auto/model/auto.service';
import { ProductService } from '@/entities/products/model/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMetaData } from '../product-list/product-list.component';

@Component({
  selector: 'app-auto-list',
  templateUrl: './auto-list.component.html',
  styleUrls: ['./auto-list.component.scss']
})
export class AutoListComponent implements OnInit {
  public products: any[] = [];
  public meta!: IMetaData;
  public loading: boolean = false;
  public currentPage: number = 1;
  public rows: number = 2;
  public mode: string = 'card';
  public sortType: string = '-createdAt';
  columnTitles: string[] = [
    'Наименование',
    'Категория',
    'Бренд',
    'Дата создания'
  ];
  columns: string[] = [
    'title',
    'category',
    'brand',
    'createdAt',
  ];
  public sortSettings: { title: string, slug: string }[] = [
    {
      title: 'Cначала новые',
      slug: '-createdAt'
    },
    {
      title: 'Cначала cтарые',
      slug: 'createdAt'
    },
    {
      title: 'По убыванию цены',
      slug: '-price'
    },
    {
      title: 'По возрастанию цены',
      slug: 'price'
    }
  ];
  public pageLimits: number[]= [1, 2, 4];
  constructor(
    private readonly autoService: AutoService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getAutoList();
  }

  ngDoCheck(): void {
    console.log(this.sortType);
  }

  public getAutoList(): void {
    this.loading = true;
    this.autoService
      .getAll(this.currentPage, this.rows, this.sortType)
      .subscribe((res: any) => {
        console.log(res);
        this.products = res.data;
        this.meta = {
          total: res.total,
          current_page: res.current_page,
          per_page: res.per_page,
          from: res.from,
          to: res.to,
        };
        this.loading = false;
      });
  }

  public handleChangeMode(mode: string): void {
    this.mode = mode;
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

  public handleSelect(event: any): void {
    this.sortType = event
  }

  public paginate(page: number): void {
    this.currentPage = page;
    this.getAutoList();
    this.router.navigate([`/auto-list`], {
      queryParams: {page: this.currentPage},
      queryParamsHandling: 'merge',
    });
  }

  public onChange(value: number): void {
    this.rows = value;
    this.router.navigate([`/auto-list`], {
      queryParams: {rows: this.rows},
      queryParamsHandling: 'merge',
    });
    this.getAutoList();
  }

  public handleSort(): void {
    this.getAutoList();
    this.router.navigate([`/auto-list`], {
      queryParams: {rows: this.rows},
      queryParamsHandling: 'merge',
    });
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

}
