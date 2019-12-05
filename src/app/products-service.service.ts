import { Injectable } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  apiPath :string = "http://stage.api.taniawater.sa/api/auth/item/getItemList?_format=json&longitude=25.12365&latitude=32.123456";

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(this.apiPath );
  }
}
