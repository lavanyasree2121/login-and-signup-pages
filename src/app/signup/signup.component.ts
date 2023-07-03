import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  time: number = 300;
  display : any;
  interval : any;

  
  signupform!:FormGroup;
  psVisible :boolean = true


  constructor(private formBuilder:FormBuilder){
}
ngOnInit(): void {
  this.signupform=this.formBuilder.group({
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    otp:["",[Validators.required,Validators.minLength(4)]],
  })
console.log("display: ", this.display);

}
hideShowPass(){
  this.psVisible = !this.psVisible
}

verify=false
content= true

onSubmit(){
  this.verify=true
  this.content=false
  alert();

}
startTimer() {
  console.log("=====>");
  this.interval = setInterval(() => {
    if (this.time === 0) {
      this.time--;
    } else {
      this.time--;
    }
    this.display=this.transform( this.time)
  }, 1000);
}
transform(value: number): string {
  const minutes: number = Math.floor(value / 60);
  return minutes + ':' + (value - minutes * 60);
}


}
