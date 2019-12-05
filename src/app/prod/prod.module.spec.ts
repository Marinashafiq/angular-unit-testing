import { ProdModule } from './prod.module';

describe('ProdModule', () => {
  let prodModule: ProdModule;

  beforeEach(() => {
    prodModule = new ProdModule();
  });

  it('should create an instance', () => {
    expect(prodModule).toBeTruthy();
  });
});
