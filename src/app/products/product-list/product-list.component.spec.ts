import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ProductListComponent } from "./product-list.component";
import { TransferServiceService } from "../../transfer-service.service";
import { ProductsServiceService } from "../../products-service.service";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { of } from "rxjs";
import { Products } from '../../shared/products.model';
import { By } from "@angular/platform-browser";
import { ProductItemComponent } from "./product-item/product-item.component";

describe('Products List', () => {
    let fixture: ComponentFixture<ProductListComponent>;
    let mockTransferService;
    let mockProductsService;
    let PRODUCTS: Array<Products>;


    beforeEach(() => {

        PRODUCTS = [
            {
                "id": 62,
                "name": "تانيا الاتحاد ٣٣٠مل x ٤٠ قارورة/الكرتون",
                "nameEn": "Tania-Al-Ittihad 330ml x 40 Bottles/Carton",
                "nameAr": "تانيا الاتحاد ٣٣٠مل x ٤٠ قارورة/الكرتون",
                "price": 16,
                "image": "http://stage.api.taniawater.sa/uploads/item-images/b2d136a10ed52f7d495baeff1c8f8bf74f190698.jpeg",
                "cityId": null,
                "minimumAmountToOrder": 2,
                "package": null,
                "packageSize": null,

            },
            {
                "id": 61,
                "name": "تانيا شرنك ٢٠٠مل x ٢٠ قارورة",
                "nameEn": "shrink 200ml x20 Bottles",
                "nameAr": "تانيا شرنك ٢٠٠مل x ٢٠ قارورة",
                "price": 8,
                "image": "http://stage.api.taniawater.sa/uploads/item-images/fd5e4f9577add8b011bc4d1ce39bfa0b2bd610b9.jpeg",
                "cityId": null,
                "minimumAmountToOrder": 2,
                "package": null,
                "packageSize": null,
            }
        ];

        @Component({
            selector: 'app-product-item',
            template: '<div></div>',
        })
        class fakeProductItemComponent {
            //we don't need this too but we will just keep it 
            @Input() item: any;

        }

        mockTransferService = jasmine.createSpyObj(['setUrlHistoryObj', 'getUrlHistoryObj']);
        mockProductsService = jasmine.createSpyObj(['getData']);

        TestBed.configureTestingModule({
            declarations: [
                ProductListComponent,
                fakeProductItemComponent
            ],
            providers: [
                { provide: TransferServiceService, useValue: mockTransferService },
                { provide: ProductsServiceService, useValue: mockProductsService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(ProductListComponent);
    });

    it('should call getData method using service', () => {
        mockProductsService.getData.and.returnValue(of(PRODUCTS));
        fixture.detectChanges();
        expect(mockProductsService.getData).toHaveBeenCalled();
    });

    it('should fill products array with 2 items', () => {
        mockProductsService.getData.and.returnValue(of(PRODUCTS));
        fixture.detectChanges();
        console.log(fixture);
        fixture.componentInstance.products = PRODUCTS;
        console.log(fixture.componentInstance.products);
        expect(fixture.componentInstance.products.length).toEqual(2);

    })

})