import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSignup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createFormSignup()
  }

  ngOnInit(): void {
  }

  createFormSignup(): void {
    this.formSignup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
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
}
