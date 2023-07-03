import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  regform!:FormGroup;
  sent=false;
  entire=true;
  verify=false;
  content=true;
  verify1=false;
  update=false;
  top=true;
  psVisible :boolean = true;
  psVisible1 :boolean = true;
  remainingTime: number = 50;
  disableOTPField: boolean = false;
private unsubscribeTimer: Subject<void> = new Subject<void>();

  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.regform=this.fb.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:["",[Validators.required,Validators.minLength(8),this.passwordValidator(),]],
       confirmpassword:['',Validators.required],
    },{ validators: this.matchpassword });
  }
    pass(){
      this.sent=true;
      const timer = interval(1000); // Emit every 1 second (1000 milliseconds)
      timer.pipe(takeUntil(this.unsubscribeTimer)).subscribe(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          this.remainingTime = 0;
          this.disableOTPField = true; 
          // Handle expired OTP here
        }
      })
    }
    
      // /^(?=.\d)(?=.[a-zA-Z])(?=.*[A-Z]).{8}$/;
    

  
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%&])[a-zA-Z0-9!@#%&]{8,}$/;
      const valid = passwordPattern.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  matchpassword(regform: FormGroup) {
    return regform.controls['password'].value && regform.controls
    ['password'].value === regform.controls['confirmpassword'].value ? regform.controls
    ['confirmpassword'].setErrors(null) : regform.controls['confirmpassword'].setErrors({ 'misMatch':true})
}
  hideShowPass(){
    this.psVisible = !this.psVisible
    
  }
  hideShowPass1(){
    this.psVisible1 = !this.psVisible1
    
  }

  otp(){
    this.verify1=true;
    this.top=false;
    this.verify=false;
    this.update=false;
  }
  forget(){
   this.verify=true;
   this.top=false;
   this.verify1=false;
   this.update=false;
   

  }
  onSubmit(){

  }
  updating(){
    this.verify=false;
    this.top=false;
    this.verify1=false;
    this.update=true;
  }
  ngOnDestroy() {
    this.unsubscribeTimer.next(); // Emit a value to complete the timer
    this.unsubscribeTimer.complete(); // Complete the timer observable
  }

}

function pass() {
  throw new Error('Function not implemented.');
}
