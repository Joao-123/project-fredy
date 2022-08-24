import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from "../../services/users.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSignUp!: FormGroup;
  formLogIn!: FormGroup;
  send = false;
  credentialsInvalid = false
  msjErrorSignUp = {
    ci:'',
    name: '',
    lastName: '',
    cell: '',
    password: '',
    passwordConfirm: ''
  }

  msjErrorLogIn = {
    ci:'',
    password: ''
  }

  constructor(private fb: FormBuilder, public userService: UsersService, private router:Router, public _location: Location) {
    this.createFormLogIn();
    this.createFormSignUp();
  }

  ngOnInit(): void {
  }

  createFormSignUp(): void {
    this.formSignUp = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      cell: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    },{
      validador: Validators.required
    } as AbstractControlOptions);
  }

  createFormLogIn(): void {
    this.formLogIn = this.fb.group({
      ci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern(/^[0-9\s]+$/)]],
      password: ['', [Validators.required]]
    },{
      validador: Validators.required
    } as AbstractControlOptions);
  }

  register() {
    if (this.formSignUp.invalid || !this.comparePassword()) {
      this.formSignUp.markAllAsTouched();
    } else {
      this.send = true;
      const help = this.formSignUp.value;

      const usuario={
        ci: help.ci,
        nombres: help.name,
        apellidos: help.lastName,
        cell: help.cell,
        estado: 'activo',
        password: help.password,
        edad: 22,
        rol: 1
      }

      this.userService.addUsuario(usuario).subscribe(
        data => {
          console.log(data);
        });
      setTimeout(() => {
        this.send = false;
      }, 2000);
    }
  }

  logIn() {
    if (this.formLogIn.invalid) {
      this.formLogIn.markAllAsTouched();
    } else {
      this.send = true;
      const help = this.formLogIn.value;

      const usuario = {
        ci: help.ci,
        password: help.password
      };

      this.userService.login(usuario).subscribe(
        data => {
          if (data.msj === 'not found') {
            this.send = false;
            this.credentialsInvalid = true
            this.formLogIn.reset();
            setTimeout(() => {
              this.credentialsInvalid = false;
            }, 1400);
          } else {
            localStorage.setItem('userLog', JSON.stringify(data))
            location.reload()
          }
        });
      // setTimeout(() => {
      //   this.send = false;
      // }, 5000);
    }
  }

  get ciValidSignUp(){
    this.formSignUp.get('ci')?.errors?.['required'] ? this.msjErrorSignUp.ci = 'Campo obligatorio':
    this.formSignUp.get('ci')?.errors?.['pattern'] ? this.msjErrorSignUp.ci = 'Solo se aceptan numeros':
    this.formSignUp.get('ci')?.errors?.['minlength'] ? this.msjErrorSignUp.ci = 'Minimo 7 caracteres':
    this.formSignUp.get('ci')?.errors?.['maxlength'] ? this.msjErrorSignUp.ci = 'Maximo 10 caracteres': ''

    return this.formSignUp.get('ci')?.invalid && this.formSignUp.get('ci')?.touched;
  }

  get nameValidSignUp(){
    this.formSignUp.get('name')?.errors?.['required'] ? this.msjErrorSignUp.name = 'Campo obligatorio':
    this.formSignUp.get('name')?.errors?.['pattern'] ? this.msjErrorSignUp.name = 'Solo se aceptan letras':
    this.formSignUp.get('name')?.errors?.['minlength'] ? this.msjErrorSignUp.name = 'Minimo 3 caracteres': ''

    return this.formSignUp.get('name')?.invalid && this.formSignUp.get('name')?.touched;
  }

  get lastNameValidSignUp(){
    this.formSignUp.get('lastName')?.errors?.['required'] ? this.msjErrorSignUp.lastName = 'Campo obligatorio':
    this.formSignUp.get('lastName')?.errors?.['pattern'] ? this.msjErrorSignUp.lastName = 'Solo se aceptan letras':
    this.formSignUp.get('lastName')?.errors?.['minlength'] ? this.msjErrorSignUp.lastName = 'Minimo 3 caracteres': ''

    return this.formSignUp.get('lastName')?.invalid && this.formSignUp.get('lastName')?.touched;
  }

  get cellValidSignUp(){
    this.formSignUp.get('cell')?.errors?.['required'] ? this.msjErrorSignUp.cell = 'Campo obligatorio':
    this.formSignUp.get('cell')?.errors?.['pattern'] ? this.msjErrorSignUp.cell = 'Solo se aceptan numeros':
    this.formSignUp.get('cell')?.errors?.['minlength'] ? this.msjErrorSignUp.cell = 'Minimo 7 caracteres':
    this.formSignUp.get('cell')?.errors?.['maxlength'] ? this.msjErrorSignUp.cell = 'Maximo 10 caracteres': ''

    return this.formSignUp.get('cell')?.invalid && this.formSignUp.get('cell')?.touched;
  }

  get passwordValidSignUp(){
    this.formSignUp.get('password')?.errors?.['required'] ? this.msjErrorSignUp.password = 'Campo obligatorio': ''

    return this.formSignUp.get('password')?.invalid && this.formSignUp.get('password')?.touched;
  }

  get passwordConfirmValidSignUp(){
    this.formSignUp.get('passwordConfirm')?.errors?.['required'] ? this.msjErrorSignUp.passwordConfirm = 'Campo obligatorio':
    !this.comparePassword()? this.msjErrorSignUp.passwordConfirm = 'Las contraseñas no coinciden': ''

    return (this.formSignUp.get('passwordConfirm')?.invalid && this.formSignUp.get('passwordConfirm')?.touched) || !this.comparePassword();
  }

  comparePassword() {
    return this.formSignUp.value.password === this.formSignUp.value.passwordConfirm
  }

  get ciValidLogIn(){
    this.formLogIn.get('ci')?.errors?.['required'] ? this.msjErrorLogIn.ci = 'Campo obligatorio':
    this.formLogIn.get('ci')?.errors?.['pattern'] ? this.msjErrorLogIn.ci = 'Solo se aceptan numeros':
    this.formLogIn.get('ci')?.errors?.['minlength'] ? this.msjErrorLogIn.ci = 'Minimo 7 caracteres':
    this.formLogIn.get('ci')?.errors?.['maxlength'] ? this.msjErrorLogIn.ci = 'Maximo 10 caracteres': ''

    return this.formLogIn.get('ci')?.invalid && this.formLogIn.get('ci')?.touched;
  }

  get passwordValidLogIn(){
    this.formLogIn.get('password')?.errors?.['required'] ? this.msjErrorLogIn.password = 'Campo obligatorio':
    ''

    return this.formLogIn.get('password')?.invalid && this.formLogIn.get('password')?.touched;
  }

}
