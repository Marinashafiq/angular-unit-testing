import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verfication-form',
  templateUrl: './verfication-form.component.html',
  styleUrls: ['./verfication-form.component.css']
})
export class VerficationFormComponent implements OnInit {
  userVerfication : FormGroup;
  userLocalStorage : object;
  userId : number;
  userVerfCode : number;
  verfURL : string;
  constructor(private fb : FormBuilder , private http : HttpClient , private router:Router) {
    this.userLocalStorage={};
   }

  ngOnInit() {

    this.userVerfication = this.fb.group({
      verfCode: ['', [
        Validators.required, 
        Validators.maxLength(4) 
      ]]
    });

    this.userLocalStorage = JSON.parse(localStorage.getItem('user-response'));
    console.log(this.userLocalStorage);
    console.log(this.userLocalStorage['user'].id);
    this.userId = this.userLocalStorage['user'].id;
  }

  onSubmit(verficationCode : FormGroup) {
    console.log(verficationCode.value.verfCode);
    this.userVerfCode = verficationCode.value.verfCode;
    this.verfURL = 'http://stage.api.taniawater.sa/api/checkVerificationCode/'+this.userId+"/"+this.userVerfCode;
    console.log(this.verfURL);
    this.http.get(this.verfURL).subscribe(
      res => {
        console.log(res);
        if(res['status']== true)
        {
          localStorage.setItem('token',JSON.stringify(res));
          this.router.navigate(['']);
        }

      },
      err =>{
        console.log(err);
      })
    }
  }


