import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { WomenService } from 'src/app/services/women.service';
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fb: FormBuilder;
  send = false;
  user:any;

  formVenta: FormGroup
  listProuct: any;
  listWomen: any;

  constructor(fb: FormBuilder,
    public productService: ProductsService,
    public womenService: WomenService) 
    {
    this.user = JSON.parse(localStorage.getItem('userLog')|| '{}');
    console.log(this.user);
    this.fb = fb
    this.formVenta = this.fb.group({
      productos: this.fb.array([
      ]),
      mujeres: this.fb.array([
      ])
    });
    this.addMujer()
    this.addProducto()
  }

  get productos() {
    return this.formVenta.controls["productos"] as FormArray;
  }

  get mujeres() {
    return this.formVenta.controls["mujeres"] as FormArray;
  }

  // push new form control when user clicks add button
  addMujer() {
    const control = (<FormArray>this.formVenta.get('mujeres'));
    control.push(this.fb.group({
      nombres: ['', [Validators.required]],
      manilla: ['', ],
    }))
  }
  // push new form control when user clicks add button
  addProducto() {
    const control = <FormArray>this.formVenta.controls['productos'];
    control.push(this.fb.group({
      nombre: ['', ],
      precio: ['', ],
      cantidad: ['', ],
      manilla: ['', ],
      compra: ['', ],
      ganancia: ['', ],
    }))
  }

  eliminarProducto(lessonIndex: number) {
    this.productos.removeAt(lessonIndex);
  }

  eliminarMujer(lessonIndex: number) {
    this.mujeres.removeAt(lessonIndex);
  }

  setProduct(i: number) {
    console.log('setProduct');
  }

  setWoman(i: number) {
    console.log('setWoman');
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data => {
        console.log(data);
        this.listProuct = data;
      });

    this.womenService.getAll().subscribe(
      data => {
        console.log(data);
        this.listWomen = data;
      });
  }

  capitalize(text:string){
    return text.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  save() {
    console.log('save');
  }

}
