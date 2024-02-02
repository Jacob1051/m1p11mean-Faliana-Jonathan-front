import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    mdp: ['', Validators.required]
  });

  onSubmit() {
    const auth = this.loginForm.value;

    if(auth.email && auth.mdp){

    }
    console.log(auth);
  }

  constructor(private formBuilder: FormBuilder){}
}
