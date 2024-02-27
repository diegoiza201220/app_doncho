import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { MainComponent } from './components/main/main.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { ComprasComponent } from './components/compras/compras.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';

import { RptOrdenesComponent } from './components/reportes/ordenes/rptordenes.component';
import { RptComprasComponent } from './components/reportes/compras/rptcompras.component';
import { RptVentasComponent } from './components/reportes/ventas/rptventas.component';
import { RptVentasproductosComponent } from './components/reportes/ventasproductos/rptventasproductos.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'ingredientes', component: IngredientesComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'cocina', component: CocinaComponent},
  {path: 'ordenes', component: RptOrdenesComponent},
  {path: 'compras', component: RptComprasComponent},
  {path: 'ventas', component: RptVentasComponent},
  {path: 'ventasproductos', component: RptVentasproductosComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
