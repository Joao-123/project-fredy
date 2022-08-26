import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) {}

  addSells(venta: any): Observable<Object>{
    console.log(venta);
    return this.http.post('http://localhost:8000/ventas/add', JSON.stringify(venta));
  }

  getMySales(i: number): Observable<Object>{
    console.log(i);
    return this.http.get(`http://localhost:8000/ventas/get/${i}`);
  }
}
