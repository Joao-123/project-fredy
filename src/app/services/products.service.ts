import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<Object>{
    console.log(product);
    return this.http.post('http://localhost:8000/productos/add', JSON.stringify(product));
  }

  listProduct(product: any): Observable<Object>{
    console.log(product);
    return this.http.post('http://localhost:8000/productos/list', JSON.stringify(product));
  }
}
