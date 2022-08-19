import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formProduct!: FormGroup;
  fb: FormBuilder;
  send = false;

  msjError = {
    nombre:'',
    precio: '',
    stock: ''
  }

  constructor(fb: FormBuilder, public productService: ProductsService) {
    this.fb = fb
    this.formProduct = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-zñÑ\s]+$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {}

  saveAll() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      this.send = true;
      const help = this.formProduct.value;

      const product = {
        nombre: help.nombre,
        precio: help.precio,
        stock: help.stock
      };

      this.productService.addProduct(product).subscribe(
        data => {
          console.log(data);
          this.formProduct.reset();
        });
      setTimeout(() => {
        this.send = false;
      }, 2000);
    }
  }

  get nombreValid(){
    this.formProduct.get('nombre')?.errors?.['required'] ? this.msjError.nombre = 'Campo obligatorio':
    this.formProduct.get('nombre')?.errors?.['pattern'] ? this.msjError.nombre = 'Solo se aceptan letras':
    this.formProduct.get('nombre')?.errors?.['minlength'] ? this.msjError.nombre = 'Minimo 3 caracteres': ''

    return this.formProduct.get('nombre')?.invalid && this.formProduct.get('nombre')?.touched;
  }

  get precioValid(){
    this.formProduct.get('precio')?.errors?.['required'] ? this.msjError.precio = 'Campo obligatorio':
    this.formProduct.get('precio')?.errors?.['pattern'] ? this.msjError.precio = 'Solo se aceptan numeros':''

    return this.formProduct.get('precio')?.invalid && this.formProduct.get('precio')?.touched;
  }

  get stockValid(){
    this.formProduct.get('stock')?.errors?.['required'] ? this.msjError.stock = 'Campo obligatorio':
    this.formProduct.get('stock')?.errors?.['pattern'] ? this.msjError.stock = 'Solo se aceptan numeros':''

    return this.formProduct.get('stock')?.invalid && this.formProduct.get('stock')?.touched;
  }

}
