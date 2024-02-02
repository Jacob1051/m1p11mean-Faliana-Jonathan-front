import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/utils/form/password-validator.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted: boolean = false;
  // registerForm = this.formBuilder.group(
  //   {
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', Validators.required, Validators.email],
  //     password: ['', Validators.required, Validators.minLength(8)],
  //     confirmPassword: ['', Validators.required],
  //   },
  //   {
  //     validator: confirmPasswordValidator
  //   }
  // );

  registerForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
    }, confirmPasswordValidator);

  onSubmit() {
    const auth = this.registerForm.value;

    if(auth.email && auth.mdp){

    }
    console.log(auth);
  }

  constructor(private formBuilder: FormBuilder){}
}
