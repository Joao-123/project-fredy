import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersService } from './services/users.service';
import { ProductsService } from "./services/products.service";
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ItemsComponent } from './components/items/items.component';
import { RegisterComponent as ItemsRegisterComponent } from './components/items/register/register.component';
import { ListComponent as ItemsListComponent } from './components/items/list/list.component';
import { SalesComponent } from './components/sales/sales.component';
import { RegisterComponent as SalesRegisterComponent } from "./components/sales/register/register.component";
import { ListComponent as SalesListComponent } from "./components/sales/list/list.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    ItemsComponent,
    SalesComponent,
    ItemsRegisterComponent,
    ItemsListComponent,
    SalesRegisterComponent,
    SalesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
