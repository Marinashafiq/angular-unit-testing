import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../products-service.service';
import { Products } from '../../shared/products.model';
import { TransferServiceService } from '../../transfer-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<any>;



  constructor(private productService: ProductsServiceService, private urlHistoryService: TransferServiceService) {


    this.products = [];

    console.log(this.products);

  }

  ngOnInit() {
    console.log(this.products);
    this.getServiceData();
    console.log(this.products);
  }

  getServiceData() {
    console.log(this.products);
    this.productService.getData().subscribe(data => {
      console.log(data);
      this.products = data['items'].map(x => new Products());
      console.log(this.products);
      this.urlHistoryService.setUrlHistoryObj(this.products);
    });
  }
}
