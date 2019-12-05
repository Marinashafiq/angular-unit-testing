//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductSingleComponent } from './products/product-single/product-single.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerficationFormComponent } from './verfication-form/verfication-form.component';
//SERVICES
import { ProductsServiceService } from './products-service.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterServiceService } from './services/register-service.service';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'details',
    component: ProductSingleComponent,
    canDeactivate: [CanDeactivateGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verfication',
    component: VerficationFormComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductSingleComponent,
    RegisterComponent,
    LoginComponent,
    VerficationFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductsServiceService,
    RegisterServiceService,
    CanDeactivateGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
