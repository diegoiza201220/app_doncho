import { Component, Renderer2 } from '@angular/core';
import Producto from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SecuenciaService } from 'src/app/services/secuencia.service';
// import Secuencia from 'src/app/interfaces/secuencia.interface';
// import Orden from 'src/app/interfaces/orden.interface';
import Formadepago from 'src/app/interfaces/formadepago.interface';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Router, RouterLink } from '@angular/router';
import { OrdenescocinaService } from 'src/app/services/ordenescocina.service';
import Secuencia from 'src/app/interfaces/secuencia.interface';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PedidosComponent {
  lproductos: any[] = [];
  lproductoschoclo: any[] = [];
  lproductoschocho: any[] = [];
  lproductosporciones: any[] = [];
  lproductosbebidas: any[] = [];
  lproductosotros: any[] = [];

  lsecuencia: Secuencia[] = [{secuencia:0,id:''}];
  pedido: any = {};
  lordencocina: any[] = [];
  mostrarCargar: boolean = true;

  formasdepago: Formadepago[] = [{ name: 'Tarjeta crédito/débito', code: 'TC/TD' },
  { name: 'Transferencia', code: 'TR' },
  { name: 'Efectivo', code: 'EF' }];

  selectedFP: Formadepago | undefined;

  pago: number = 0;
  cambio: number = 0;

  loading: boolean = false;

  fecha: Date = new Date();

  constructor(private productosService: ProductosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private secuenciaService: SecuenciaService,
    private ordenesService: OrdenesService,
    private ordenesCocinaService: OrdenescocinaService,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.getProductosObserver();
    this.getSecuenciaObserver();
    //this.fillGrupoProducto();
    
  }

  getProductosObserver(): void {
    this.productosService.getProductosObservable().subscribe(productos => {
      this.lproductos = productos;
    })
  }

  getSecuenciaObserver(): void {
    this.secuenciaService.getSecuenciaObservable().subscribe(secuencia => {
      this.lsecuencia = secuencia;
    })
  }

  fillGrupoProducto() {
    if (!this.mostrarCargar){
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
    this.mostrarCargar=false;
    this.lproductoschoclo.sort((a, b) => (a.ordenaparicion > b.ordenaparicion ? -1 : 1));
    this.lproductoschocho.sort((a, b) => (a.ordenaparicion > b.ordenaparicion ? -1 : 1));
    this.lproductosporciones.sort((a, b) => (a.ordenaparicion > b.ordenaparicion ? -1 : 1));
    this.lproductosbebidas.sort((a, b) => (a.ordenaparicion > b.ordenaparicion ? -1 : 1));
    this.lproductosotros.sort((a, b) => (a.ordenaparicion > b.ordenaparicion ? -1 : 1));
    console.log(this.mostrarCargar);
    //debugger
    
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
    switch (event.index) {
      case 1: {
        this.cargarDetalleOrden();
        break;
      }

    }
  }

  cargarDetalleOrden() {
    // this.orden.productos.forEach(element => {
    //   this.orden.productos.pop();
    // })
    this.pedido.productos = [];
    //console.log(this.pedido);

    //this.orden.productos.length = 1;
    //console.log(this.orden.productos.length);

    this.calcularDetalles(this.lproductoschocho.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductoschoclo.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosporciones.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosbebidas.filter(x => x.badge > 0));
    this.calcularDetalles(this.lproductosotros.filter(x => x.badge > 0));
    this.pedido.totalorden = this.pedido.productos.reduce((sum: any, current: { preciototal: any; }) => sum + current.preciototal, 0);
  }

  calcularDetalles(lista: any[]) {
    //this.orden: Orden {};
    //this.pedido.productos = [];
    console.log(this.pedido);
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

  onBlurPago() {
    this.cambio = this.pago - this.pedido.totalorden;
  }

  grabarOrden() {
    this.loading = true;

    setTimeout(() => {
      var d = new Date();
      d.setHours(d.getHours() - 5);
      var dt = d.toISOString(); 
      this.pedido.secuencial = this.lsecuencia[0].secuencia;
      this.pedido.tipodepago = this.selectedFP?.name ? 'EF' : 'TC/TD';
      this.pedido.fecha = dt;
      //this.orden.productos = this.orden.productos.filter(n=>n);
      //console.log(this.pedido);
      this.pedido.productos.forEach((element: { plato: any; cantidad: any; pedidoacocina: any; }) => {
        if (Boolean(element.pedidoacocina)) {
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
      //console.log(this.lsecuencia[0]);
      this.secuenciaService.updateSecuencia(this.lsecuencia[0]);
      this.lordencocina.forEach(element => {
        console.log(element);
        this.ordenesCocinaService.addOrdencocina(element);
      });
      this.loading = false;
      this.router.navigateByUrl('main');
    }, 1000);
  }
}

