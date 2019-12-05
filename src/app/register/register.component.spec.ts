import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterServiceService } from '../services/register-service.service';
import { By } from '@angular/platform-browser';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { User } from '../shared/user.model';


describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRegisterService;
  let abstract: AbstractControl;
  let formGroup: FormGroup;
  let service: RegisterServiceService;

  beforeEach(() => {

    mockRegisterService = jasmine.createSpyObj(['sendData']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterServiceService, useValue: mockRegisterService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    service = TestBed.get(RegisterServiceService)
  });

  it('should create resgiter component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  })

  it('should return false if form not valid yet', () => {
    expect(fixture.componentInstance.registeredUser.valid).toBeFalsy();
  });

  it('should button be disabled if form is not valid yet', () => {
    let submitBtn = fixture.nativeElement.querySelector('button');
    expect(submitBtn.disabled).toBeTruthy();
  });

  it('should trigger submit button event', () => {
    const submitBtn = fixture.debugElement.query(By.css('button'));
    let handler = submitBtn.triggerEventHandler('click', null);
    expect(handler).toBeFalsy();
  })

  describe('Phone Validation', () => {
    it('should return false if phone is not a KSA number', () => {
      let phone = fixture.componentInstance.registeredUser.controls['phone'];
      phone.setValue(1201621392);
      expect(phone.valid).toBeFalsy();
    });
    it('should return true if phone is a KSA number', () => {
      let phone = fixture.componentInstance.registeredUser.controls['phone'];
      phone.setValue(512345678);
      expect(phone.valid).toBeTruthy();
    });
  });


  describe('Email Validation', () => {
    it('should return false if email is not correct', () => {
      let email = fixture.componentInstance.registeredUser.controls['email'];
      email.setValue('marina');
      expect(email.valid).toBeFalsy();
    })
    it('should return true if email is matched email pattern', () => {
      let email = fixture.componentInstance.registeredUser.controls['email'];
      email.setValue('marina@example.com');
      expect(email.valid).toBeTruthy();
    })
  })

  describe('Password Validation', () => {

    it('should return false if password length is less than 6', () => {
      let pass = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      pass.setValue('123');
      let errors = pass.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    })

    it('should password return false if contains letters only', () => {
      let pass = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      pass.setValue('marina');
      expect(pass.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('input.pass')).nativeElement.value).toContain('marina');
    });

    it('should password return false if contains numbers only', () => {
      let pass = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      pass.setValue('123');
      expect(pass.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('input.pass')).nativeElement.value).toContain('123');
    });

    it('should password return true if contains both letters and numbers', () => {
      let pass = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      pass.setValue('marina123');
      expect(pass.valid).toBeTruthy();
      expect(fixture.debugElement.query(By.css('input.pass')).nativeElement.value).toContain('marina123');
      let errors = pass.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
    });
  })

  describe('Password Matching', () => {
    it('should return confirm password is required if empty', () => {
      let confirm = fixture.componentInstance.registeredUser.controls['passwords'].get('confirm_password');
      expect(confirm.valid).toBeFalsy();
    })

    it('should return true if values of passwords matched', () => {
      let password = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      let confirm = fixture.componentInstance.registeredUser.controls['passwords'].get('confirm_password');
      password.setValue('marina123');
      confirm.setValue('marina123');
      fixture.detectChanges();
      expect(password.value).toEqual(confirm.value);
    });

    it('should return false if values of passwords not matched', () => {
      let password = fixture.componentInstance.registeredUser.controls['passwords'].get('password');
      let confirm = fixture.componentInstance.registeredUser.controls['passwords'].get('confirm_password');
      password.setValue('marina123');
      confirm.setValue('marina');
      fixture.detectChanges();
      expect(password.value).not.toEqual(confirm.value);
    });

  });

  describe('Submitting Form', () => {

    it('should not submit form if all data are valid', () => {
      expect(fixture.componentInstance.registeredUser.valid).toBeFalsy();;

      fixture.componentInstance.registeredUser.controls['fullName'].setValue('Marina Magdy')
      fixture.componentInstance.registeredUser.controls['phone'].setValue('512345678');
      fixture.componentInstance.registeredUser.controls['email'].setValue('marina@example.com');
      fixture.componentInstance.registeredUser.controls['passwords'].get('password').setValue('mar12345');
      fixture.componentInstance.registeredUser.controls['passwords'].get('confirm_password').setValue('mar12345');
      fixture.nativeElement.querySelector('button').click();

      expect(fixture.componentInstance.registeredUser.valid).toBeTruthy();;
      fixture.detectChanges();
      let submitBtn = fixture.nativeElement.querySelector('button');
      expect(submitBtn.disabled).toBeFalsy();
      fixture.detectChanges();
      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      expect(mockRegisterService.sendData).toHaveBeenCalled();
    });
  })


});
