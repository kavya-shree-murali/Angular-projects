import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../services/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: ILogin = { userid: "admin@gmail.com", password: "Admin@123" }  
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string;  
  constructor(  
     private formBuilder: FormBuilder,  
     private router: Router,  
     private authService: AuthService,
     private toastr: ToastrService
  ) { }  

  ngOnInit() {  
     this.loginForm = this.formBuilder.group({  
        userid: ['', Validators.required],  
        password: ['', Validators.required]  
     });  
  this.returnUrl = '/dashboard';  
  this.authService.logout();  
  }  

// convenience getter for easy access to form fields  
get f() { return this.loginForm.controls; }  
login() {  
 
  // stop here if form is invalid  
  if (this.loginForm.invalid) {  
     return;  
  }  
  else {  
    console.log(this.f)
     if (this.f['userid'].value == this.model.userid && this.f['password'].value == this.model.password) {  
     console.log("Login successful");  
     //this.authService.authLogin(this.model);  
     localStorage.setItem('isLoggedIn', "true");  
     localStorage.setItem('token', this.f['userid'].value); 
     this.toastr.success('Logged In Successfully...!')
     this.router.navigate([this.returnUrl]);  
     }  
  else {  
     this.message = "Please check your userid and password";  
     this.toastr.error("Please check your userid and password")
     }  
    }  
 }  

 emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

 passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/
  
}
