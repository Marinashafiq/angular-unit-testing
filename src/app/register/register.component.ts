import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterServiceService } from '../services/register-service.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser: FormGroup;
  phonePattern = new RegExp(/^(5|0|3|6|4|9|1|8|7)([0-9]{8})$/);
  pwdPattern = new RegExp(/^.*(?=.*\d)(?=.*[a-zA-Z]).*$/);
  emailPattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  registerFormData;
  validNumber;

  constructor(private fb: FormBuilder, private register: RegisterServiceService) { }

  ngOnInit() {
    this.registeredUser = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.phonePattern)
      ])],
      passwords: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(this.pwdPattern),
        ]],
        confirm_password: ['', Validators.required]
      }, { validator: this.passwordConfirming })
    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
  }

  onSubmit(registerData: FormGroup) {
    // console.log(registerData.value);
    if (registerData.valid) {
      // console.log(registerData.value.phone);
      this.validNumber = '+966' + registerData.value.phone;
      // console.log(this.validNumber);
      this.registerFormData = new User(registerData.value);
      this.registerFormData.phone = this.validNumber;
      console.log(this.registerFormData.phone);
      // console.log(this.registerFormData);
      this.register.sendData(this.registerFormData).subscribe(
        res => {
          // console.log(res);
          // console.log(JSON.stringify(res));
          if (res['status'] == true) {
            // this.router.navigate(['/verfication']);
            localStorage.setItem('user-response', JSON.stringify(res));
          }
        },
        err => {
          console.log(err);
        })
    }
    else {
      console.log("INVALID FORM");
    }
  }
}
