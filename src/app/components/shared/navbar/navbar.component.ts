import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive: boolean = false;
  login: boolean
  constructor(private router: Router, public _location: Location) {
    this.login = localStorage.getItem('userLog')? true: false
  }

  ngOnInit(): void {
  }

  open(validate: boolean) {
    validate?
    this.isActive = !this.isActive: ''
  }

  exit(){
    // this.router.navigate(['login'])
    localStorage.removeItem('userLog')
    location.reload()
  }

}
