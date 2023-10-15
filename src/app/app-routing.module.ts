import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { ComprasmensualesComponent } from './components/reportes/comprasmensuales/comprasmensuales.component';
import { VentasmensualesComponent } from './components/reportes/ventasmensuales/ventasmensuales.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'cocina', component: CocinaComponent},
  {path: 'comprasmensuales', component: ComprasmensualesComponent},
  {path: 'ventasmensuales', component: VentasmensualesComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
