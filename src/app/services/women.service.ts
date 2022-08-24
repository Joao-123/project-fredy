import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WomenService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object>{
    return this.http.get('http://localhost:8000/mujeres/all');
  }
}
