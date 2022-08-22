import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ItemsComponent } from './components/items/items.component';
import { RegisterComponent as ItemsRegisterComponent } from "./components/items/register/register.component";
import { ListComponent as ItemsListComponent } from "./components/items/list/list.component";
import { SalesComponent } from './components/sales/sales.component';


const routesOut: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

const routesIn: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'items', component: ItemsComponent, children: [
    { path: 'add', component: ItemsRegisterComponent},
    { path: 'list', component: ItemsListComponent},
    { path: '',  redirectTo: 'list', pathMatch: 'full' }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
  // { path: '',  redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
const routes = localStorage.getItem('userLog')? routesIn: routesOut;

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
