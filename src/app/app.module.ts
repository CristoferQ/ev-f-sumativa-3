import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { DataTablesModule } from "angular-datatables";
import { EnviosComponent } from './envios/envios.component';
import { PagosComponent } from './pagos/pagos.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'envios', component: EnviosComponent},
  {path: 'pagos', component: PagosComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    EnviosComponent,
    PagosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule, 
    [RouterModule.forRoot(routes)],
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
