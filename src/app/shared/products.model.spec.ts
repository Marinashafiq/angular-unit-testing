import { Products } from "./products.model";

describe('ProductsModel', () => {

    let products: Products;

    beforeEach(() => {
        products = new Products();
    })
    it('should create products model', () => {
        expect(products).toBeTruthy();
    })

})