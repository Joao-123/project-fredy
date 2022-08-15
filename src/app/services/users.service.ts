import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get('https://reqres.in/api/users?page=2');
  }

  createUser(mesero: any): Observable<any>{
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost/laravel-oficial/public/meseros/add', mesero, {headers: headers});
  }

  addMesero(mesero: any): Observable<any>{
    console.log(mesero);
    return this.http.post('http://localhost:8000/meseros/add', JSON.stringify(mesero));
  }

  login(mesero: any): Observable<any>{
    console.log(mesero);
    return this.http.post('http://localhost:8000/meseros/login', JSON.stringify(mesero));
  }

  // addMesero(mesero: any): Observable<any>{
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  //   });
  //   return this.http.post('http://localhost/laravel-oficial/public/meseros/add', JSON.stringify(mesero),{ headers: headers});
  // }
}
