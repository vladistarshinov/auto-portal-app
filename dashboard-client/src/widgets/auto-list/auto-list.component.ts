import { AutoBrandService } from '@/entities/auto-brand/model/auto-brand.service';
import { autoSortSettings } from '@/entities/auto/libs/sort.helper';
import { AutoService } from '@/entities/auto/model/auto.service';
import { ProductService } from '@/entities/products/model/product.service';
import { IMetaData } from '@/shared/types/meta.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';


@Component({
  selector: 'app-auto-list',
  templateUrl: './auto-list.component.html',
  styleUrls: ['./auto-list.component.scss']
})
export class AutoListComponent implements OnInit {
  private searchTerm$: Subject<string> = new Subject();
  public products: any[] = [];
  public meta!: IMetaData;
  public loading: boolean = false;
  public currentPage: number = 1;
  public rows: number = 2;
  public mode: string = 'card';
  public sortType: string = '-createdAt';
  public columnTitles: string[] = [
    'Наименование',
    'Пробег',
    'Привод',
    'Тип',
    'Тип двигателя',
    'Объем',
    'Мощность',
    'Дата создания'
  ];
  public columns: string[] = [
    'title',
    'mileage',
    'driveUnit',
    'bodyType',
    'engineType',
    'engineVolume',
    'enginePower',
    'createdAt',
  ];
  public sortSettings: { title: string, slug: string }[] = autoSortSettings;
  public filterColumnsParams: { column: string; value: string }[] = [];
  public pageLimits: number[]= [1, 2, 4];
  public loadingBrands: boolean = false;
  public brands: string[] = [];
  constructor(
    private readonly autoService: AutoService,
    private readonly autoBrandService: AutoBrandService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.handleActivatedRouteParams();
    this.getAutoList();
    this.getAutoBrands();
    this.searchFieldValue();
  }

  public handleActivatedRouteParams(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.get('sort')) {
        this.sortType = params.get('sort') || '';
      }
      if (params.get('filter')) {
        let searchArray = params.get('filter')!.split(/&|=/);
        let results = [];
        for (let i = 0; i < searchArray.length; i += 2) {
          results.push({
            column: searchArray[i],
            value: searchArray[i + 1],
          });
        }
        this.filterColumnsParams = results;
      }
      if (params.get('page')) {
        this.currentPage = +(params.get('page') || 1);
      }
      if (params.get('rows')) {
        this.rows = +(params.get('rows') || 10);
      }
    });
  }

  public searchFieldValue(): void {
    this.searchTerm$.pipe(
      debounceTime(750)
    ).subscribe((searchTerm: string) => {
      this.getAutoList(searchTerm);
    })
  }

  public getAutoList(searchTerm?: string): void {
    this.loading = true;
    this.autoService
      .getAll(this.currentPage, this.rows, this.sortType, this.filterColumnsParams, searchTerm)
      .subscribe((res: any) => {
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

  public getAutoBrands(): void {
    this.loadingBrands = true;
    this.autoBrandService
      .getAll()
      .subscribe((res: string[]) => {
        this.brands = res;
        this.loadingBrands = false;
      });
  }

  public handleChangeMode(mode: string): void {
    this.mode = mode;
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

  public handleSelect(event: string): void {
    this.sortType = event
  }

  public onKeyUp($event: any) {
    this.searchTerm$.next($event.target.value);
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
    this.getAutoList();
    this.router.navigate([`/auto-list`], {
      queryParams: {rows: this.rows},
      queryParamsHandling: 'merge',
    });
  }

  public handleSort(): void {
    this.getAutoList();
    this.router.navigate([`/auto-list`], {
      queryParams: {sort: this.sortType},
      queryParamsHandling: 'merge',
    });
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

  public handleFilterByBrand(event: string): void {
    this.filterColumnsParams = [{ column: 'brand', value: event }]
    let res = this.filterColumnsParams.map((item) => `${item.column}=${item.value}`);
    this.getAutoList();
    this.router.navigate([`/auto-list`], {
      queryParams: {
        filter: res.join('&'),
        page: 1
      },
      queryParamsHandling: 'merge',
    });
  }

  protected handleReset(): void {
      this.sortType = '-createdAt';
      this.currentPage = 1;
      this.filterColumnsParams = [];
      this.router.navigate([`/auto-list`]);
      this.getAutoList();
  }

}
