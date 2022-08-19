import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nav=false

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.nav = !this.nav
  }

}
