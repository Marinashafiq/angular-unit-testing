import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  registerURL = 'http://stage.api.taniawater.sa/api/user/v2/register';
  constructor(private http : HttpClient) { }

  sendData(data:any){
    return this.http.post(this.registerURL , data);
  }
}
