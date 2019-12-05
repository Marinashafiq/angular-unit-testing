import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ProductsServiceService } from '../../products-service.service';
import { Products } from '../../shared/products.model';
import { TransferServiceService } from '../../transfer-service.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
  // products : Array<Products>;
  item: any;
  backUrl: Array<Products>;
  constructor(private route: ActivatedRoute,
    // private productService : ProductsServiceService ,  
    private urlHistoryService: TransferServiceService) {
    this.item = {};
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.backUrl = this.urlHistoryService.getUrlHistoryObj();
        for (let x of this.backUrl) {
          if (params.id == x.id) {
            console.log("FOUNDDD");
            console.log(x);
            this.item = x;
          }
        }
      });
  }

  canDeactivate() {
    console.log('i am navigating away');
    return confirm('Are you sure you want to leave ? ');
  }

}
