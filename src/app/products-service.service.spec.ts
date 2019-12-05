
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ProductsServiceService } from "./products-service.service";

describe('Products Service', () => {
    let httpTestingController: HttpTestingController;
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsServiceService],
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(ProductsServiceService);
    });

    it('should call getData method with correct url', () => {
        service.getData().subscribe();
        let req = httpTestingController.expectOne('http://stage.api.taniawater.sa/api/auth/item/getItemList?_format=json&longitude=25.12365&latitude=32.123456');
        req.flush({
            "id": 63,
            "name": "تانيا الاتحاد ٢٠٠مل x ٤٨ قارورة/الكرتون",
            "nameEn": "Tania-Al-Ittihad 200ml x 48 Bottles/Carton",
            "nameAr": "تانيا الاتحاد ٢٠٠مل x ٤٨ قارورة/الكرتون",
            "price": 16,
            "oldPrice": 0,
            "image": "http://stage.api.taniawater.sa/uploads/item-images/a32722dcaacc0956f1e0a1cff481cea9c5fb21f3.jpeg",
            "cityId": null,
            "minimumAmountToOrder": 2,
            "currentCapacity": null,
            "totalCapacity": null,
            "attribute": {
                "id": 4,
                "name": "Ittihad",
            }
        });
        expect(req.request.method).toBe('GET');
        httpTestingController.verify();
    })

})