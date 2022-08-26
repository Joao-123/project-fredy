import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { WomenService } from 'src/app/services/women.service';
import { ProductsService } from "src/app/services/products.service";

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
  listProuctHelp: any[]=[];
  listWomen: any;
  listWomenHelp: any[]=[];
  total = 0

  constructor(fb: FormBuilder,
    public productService: ProductsService,
    public womenService: WomenService,
    public sellService: SalesService)
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
      data: ['', ],
      manilla: ['Blanco', ]
    }))
  }
  // push new form control when user clicks add button
  addProducto() {
    const control = <FormArray>this.formVenta.controls['productos'];
    control.push(this.fb.group({
      data: '',
      cantidad: 1,
      descuento: null,
    }))
  }

  eliminarProducto(lessonIndex: number) {
    this.productos.removeAt(lessonIndex);
    this.calcTotal()
  }

  eliminarMujer(lessonIndex: number) {
    this.mujeres.removeAt(lessonIndex);
  }

  setProduct(data: any) {
    console.log('setProduct');
    console.log(data);
    this.listProuctHelp.push(data)
    console.log(this.listProuctHelp);

    this.calcTotal();
  }

  setWoman(data: any) {
    console.log('setWoman');
    console.log(data);
    this.listWomenHelp.push(data)

    this.calcTotal();
  }

  calcTotal() {
    this.total = 0;
    this.productos.value.forEach((x:any) => {
      this.total += (x.cantidad*x.data.precio)
      this.total -= x.descuento
    });
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
    const data={
      productos: this.productos.value,
      mujeres: this.mujeres.value,
      user: this.user,
      detalles: {
        total: this.total
      }
    }

    this.sellService.addSells(data).subscribe(
      data => {
        console.log(data);
      });
  }

}
