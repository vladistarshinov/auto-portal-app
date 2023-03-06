import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../model/product.service';

export interface ITermsDataMeta {
  total: number;
  current_page: number;
  from: number;
  to: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: any[] = [];
  public meta!: ITermsDataMeta;
  public loading: boolean = false;
  public currentPage: number = 1;
  public rows: number = 5;
  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.loading = true;
    this.productService
      .getProducts(this.currentPage, this.rows)
      .subscribe((res: any) => {
        this.products = res.data;
        this.meta = {
          total: res.total,
          current_page: res.current_page,
          from: res.from,
          to: res.to,
        };
        this.loading = false;
      });
  }

}
