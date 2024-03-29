import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CocinaComponent } from './components/cocina/cocina.component';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { LoginComponent } from './components/login/login.component';
import { RptComprasComponent } from './components/reportes/compras/rptcompras.component';
import { RptVentasComponent } from './components/reportes/ventas/rptventas.component';
import { CalendarModule } from 'primeng/calendar';
import { RptVentasproductosComponent } from './components/reportes/ventasproductos/rptventasproductos.component';
import { ChartModule } from 'primeng/chart';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { RptOrdenesComponent } from './components/reportes/ordenes/rptordenes.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavbarComponent,
    MainComponent,
    PedidosComponent,
    CocinaComponent,
    LoginComponent,
    RptComprasComponent,
    RptVentasComponent,
    RptVentasproductosComponent,
    IngredientesComponent,
    RptOrdenesComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()), TableModule, MessagesModule, InputTextModule,InputNumberModule,
    ToastModule, FormsModule, BrowserAnimationsModule, BadgeModule, TabViewModule, ChartModule,
    CheckboxModule, ToolbarModule, ButtonModule, DialogModule, ConfirmDialogModule,DropdownModule,SplitterModule, CalendarModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
