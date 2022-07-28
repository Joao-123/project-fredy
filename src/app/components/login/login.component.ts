import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSignUp!: FormGroup;
  formSignIn!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createFormSignIn();
    this.createFormSignUp;
  }

  ngOnInit(): void {
  }

  createFormSignIn(): void {
    this.formSignIn = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      password: ['', [Validators.required]]
    },{
      validador: Validators.required
    } as AbstractControlOptions);
  }

  createFormSignUp(): void {
    this.formSignUp = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      password: ['', [Validators.required]]
    },{
      validador: Validators.required
    } as AbstractControlOptions);
  }

  register() {
    console.log("registrando");
    setTimeout(() => {
      console.log("enviado");
    }, 2000);
  }

  signIn() {
    console.log('ingresando');
    setTimeout(() => {
      console.log('Dentro');
    }, 2000);
  }
}
