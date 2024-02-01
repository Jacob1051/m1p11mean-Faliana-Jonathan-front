import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    mdp: ''
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }

  constructor(private formBuilder: FormBuilder){}
}
