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

  createUser(usuario: any): Observable<any>{
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost/laravel-oficial/public/usuarios/add', usuario, {headers: headers});
  }

  addUsuario(usuario: any): Observable<any>{
    console.log(usuario);
    return this.http.post('http://localhost:8000/usuarios/add', JSON.stringify(usuario));
  }

  login(usuario: any): Observable<any>{
    return this.http.post('http://localhost:8000/usuarios/login', JSON.stringify(usuario));
  }

  // addUsuario(usuario: any): Observable<any>{
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  //   });
  //   return this.http.post('http://localhost/laravel-oficial/public/usuarios/add', JSON.stringify(usuario),{ headers: headers});
  // }
}
