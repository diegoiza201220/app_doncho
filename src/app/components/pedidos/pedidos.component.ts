import { Component, ElementRef, ViewChild } from '@angular/core';
import Producto from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SecuenciaService } from 'src/app/services/secuencia.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Router } from '@angular/router';
import { OrdenescocinaService } from 'src/app/services/ordenescocina.service';
import Secuencia from 'src/app/interfaces/secuencia.interface';
import { BaseComponent } from 'src/app/util/base.component';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class PedidosComponent extends BaseComponent {
  lproductos: any[] = [];
  lproductoschoclo: any[] = [];
  lproductoschocho: any[] = [];
  lproductosporciones: any[] = [];
  lproductosbebidas: any[] = [];
  lproductosotros: any[] = [];

  lsecuencia: Secuencia[] = [{ secuencia: 0, id: '', fecha: 0 }];
  pedido: any = {};
  lordencocina: any[] = [];
  mostrarCargar: boolean = true;
  selectedFP: string = "EF";

  pago: number = 0;
  cambio: number = 0;
  loading: boolean = false;
  fechainteger: number = 0;
  activeIndex: number = 0;

  @ViewChild('efectivorecibido') input: ElementRef | undefined; 

  constructor(private productosService: ProductosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private secuenciaService: SecuenciaService,
    private ordenesService: OrdenesService,
    private ordenesCocinaService: OrdenescocinaService,
    private router: Router,
    private datePipe: DatePipe,
    public override authService: AuthService
  ) {
    super(authService);
  }

  ngOnInit(): void {
    this.pedido = {};
    this.getProductosPromise();
    this.getSecuenciaPromise();
  }

  getProductosPromise(): void {
    this.productosService.getProductosPromise().then(productos => {
      this.lproductos = productos;
      this.fillGrupoProducto();
    })
  }

  getSecuenciaPromise(): void {
    this.secuenciaService.getSecuenciaPromise().then(secuencia => {
      this.lsecuencia = secuencia;
      let d = new Date();
      this.fechainteger = this.fechaToInteger(d);
      if (this.lsecuencia[0].fecha !== this.fechainteger) {
        this.lsecuencia[0].fecha = this.fechainteger;
        this.lsecuencia[0].secuencia = 1;
      }
    })
  }

  getProductosObserver(): void {
    this.productosService.getProductosObservable().subscribe(productos => {
      this.lproductos = productos;
    })
  }

  getSecuenciaObserver(): void {
    this.secuenciaService.getSecuenciaObservable().subscribe(secuencia => {
      let d = new Date();
      this.fechainteger = this.fechaToInteger(d);
      this.lsecuencia = secuencia;
      if (this.lsecuencia[0].fecha !== this.fechainteger) {
        this.lsecuencia[0].fecha = this.fechainteger;
        this.lsecuencia[0].secuencia = 1;
      }
    })
  }

  fillGrupoProducto() {
    if (!this.mostrarCargar) {
      return;
    }

    this.lproductos.forEach(element => {
      element.badge = '0';
      switch (element.grupo) {
        case 'CHOCLO': {
          this.lproductoschoclo.push(element);
          break;
        }
        case "CHOCHO": {
          this.lproductoschocho.push(element);
          break;
        }
        case "PORCIONES": {
          this.lproductosporciones.push(element);
          break;
        }
        case "BEBIDAS": {
          this.lproductosbebidas.push(element);
          break;
        }
        case "OTROS": {
          this.lproductosotros.push(element);
          break;
        }
      }
    });
    this.mostrarCargar = false;
    this.lproductoschoclo.sort((a, b) => (Number(a.ordenaparicion) < Number(b.ordenaparicion) ? -1 : 1));
    this.lproductoschocho.sort((a, b) => (Number(a.ordenaparicion) < Number(b.ordenaparicion) ? -1 : 1));
    this.lproductosporciones.sort((a, b) => (Number(a.ordenaparicion) < Number(b.ordenaparicion) ? -1 : 1));
    this.lproductosbebidas.sort((a, b) => (Number(a.ordenaparicion) < Number(b.ordenaparicion) ? -1 : 1));
    this.lproductosotros.sort((a, b) => (Number(a.ordenaparicion) < Number(b.ordenaparicion) ? -1 : 1));
    console.log(this.mostrarCargar);
  }


  onClickProducto(_producto: Producto, operacion: string) {
    switch (_producto.grupo) {
      case 'CHOCLO': {
        this.procesarAccion(this.lproductoschoclo, operacion, _producto);
        break;
      }
      case "CHOCHO": {
        this.procesarAccion(this.lproductoschocho, operacion, _producto);
        break;
      }
      case "PORCIONES": {
        this.procesarAccion(this.lproductosporciones, operacion, _producto);
        break;
      }
      case "BEBIDAS": {
        this.procesarAccion(this.lproductosbebidas, operacion, _producto);
        break;
      }
      case "OTROS": {
        this.procesarAccion(this.lproductosotros, operacion, _producto);
        break;
      }
    }
  }

  onChangeTab(event: any) {
    //debugger;
    this.activeIndex = event.index;
    switch (event.index) {
      case 1: {
        this.cargarDetalleOrden();
        this.focusPago();
        break;
      }
    }
  }

  focusPago(){
    //this.input?.nativeElement.focus();
  }

  continueToResumen() {
    this.activeIndex = 1;
    this.cargarDetalleOrden();
    this.focusPago();
  }

  backToSeleccion() {
    this.activeIndex = 0;
  }

  cargarDetalleOrden() {
    this.pedido.productos = [];
    this.calcularDetalles(this.lproductoschocho.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductoschoclo.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosporciones.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosbebidas.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosotros.filter(x => x.badge > 0));
    this.pedido.totalorden = this.pedido.productos.reduce((sum: any, current: { preciototal: any; }) => sum + current.preciototal, 0);
  }

  calcularDetalles(lista: any[]) {
    lista.forEach(element => {
      this.pedido.productos.push(
        {
          cantidad: element.badge,
          plato: element.nombre,
          preciounitario: element.valor,
          preciototal: element.badge * element.valor,
          pedidoacocina: element.pedidoacocina
        });
    });
  }

  procesarAccion(lista: any[], operacion: string, producto: Producto) {
    let badge = lista.find(x => x.id == producto.id).badge;
    if (badge <= 0 && operacion === '-') return;
    operacion == '+' ? lista.find(x => x.id == producto.id).badge++ : lista.find(x => x.id == producto.id).badge--;
  }

  calcularCambio(value: any) {
    this.cambio = this.pago - this.pedido.totalorden;
  }

  grabarOrden() {

    if (this.activeIndex != 1) return;

    this.loading = true;
    setTimeout(() => {
      let d = new Date();
      this.pedido.usuario = this.authService.userData.email;
      this.pedido.secuencial = this.lsecuencia[0].secuencia;
      this.pedido.tipodepago = this.selectedFP;
      this.pedido.fecha = d;
      this.pedido.fechainteger = this.fechainteger;
      this.pedido.productos.forEach((element: { plato: any; cantidad: any; pedidoacocina: any; }) => {
        if (element.pedidoacocina) {
          this.lordencocina.push({
            secuencialorden: this.lsecuencia[0].secuencia,
            producto: element.plato,
            cantidad: element.cantidad,
            recibido: false,
            procesado: false,
            entregado: false,
            observacion: ''
          })
        }
      });
      this.ordenesService.addOrden(this.pedido);
      this.lsecuencia[0].secuencia++;
      this.actualizarSecuencia();
      this.lordencocina.forEach(element => {
        console.log(element);
        this.ordenesCocinaService.addOrdencocina(element);
      });
      this.loading = false;
    }, 100);

    this.router.navigateByUrl('main');
    // this.router.navigate(['main']).then(() => {
    //   window.location.reload();
    // });
  }

  async actualizarSecuencia() {
    const response = await this.secuenciaService.updateSecuencia(this.lsecuencia[0]);
  }
}
