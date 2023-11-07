import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { ComprasComponent } from './components/reportes/compras/compras.component';
import { VentasComponent } from './components/reportes/ventas/ventas.component';
import { VentasproductosComponent } from './components/reportes/ventasproductos/ventasproductos.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { OrdenesComponent } from './components/reportes/ordenes/ordenes.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'ingredientes', component: IngredientesComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'cocina', component: CocinaComponent},
  {path: 'ordenes', component: OrdenesComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'ventasproductos', component: VentasproductosComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
