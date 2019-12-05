import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RegisterServiceService } from "./register-service.service";

describe('RegisterService', () => {

    let httpsTestingController: HttpTestingController;
    let registerService: RegisterServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RegisterServiceService]
        })
        httpsTestingController = TestBed.get(HttpTestingController);
        registerService = TestBed.get(RegisterServiceService);
    })

    it('should post the correct data to the url', () => {
        registerService.sendData({ email: 'marina@email.com', phone: 12345678 }).subscribe((data: any) => {
            expect(data.email).toContain('marina');
        });

        const req = httpsTestingController.expectOne(
            `http://stage.api.taniawater.sa/api/user/v2/register`
        );
        expect(req.request.method).toBe('POST');

        req.flush({
            email: 'marina@example.com',
            password: 'marina1234'
        });

        httpsTestingController.verify();

    })

})