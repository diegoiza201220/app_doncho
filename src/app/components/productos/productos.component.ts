import { Component } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import Producto from 'src/app/interfaces/productos.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProductosComponent {

  producto!: Producto;

  lproductos: Producto[] = [];

  clonedProductos: { [s: string]: Producto } = {};

  selectedProductos!: Producto[];

  submitted!: boolean;

  productoDialogo!: boolean;

  lgrupo: SelectItem[] = [
    { label: 'CHOCLO', value: 'CHOCLO' },
    { label: 'CHOCHO', value: 'CHOCHO' },
    { label: 'PORCIONES', value: 'PORCIONES' },
    { label: 'BEBIDAS', value: 'BEBIDAS' },
    { label: 'OTROS', value: 'OTROS' }
  ];

  constructor(private productosService: ProductosService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    //this.getProductosObserver();
    this.getProductosPromise();
  }

  openNew() {
    this.producto = { nombre: '', valor: 0, grupo: '', activo: true, ordenaparicion:0, pedidoacocina: false};
    this.submitted = false;
    this.productoDialogo = true;
  }

  hideDialog() {
    this.productoDialogo = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.addProducto();
    this.messageService.add({ severity: 'success', summary: '¡Muy bien! ', detail: 'Producto creado' });
    this.getProductosPromise();
    this.productoDialogo = false;
  }


  getProductosObserver(): void {
    this.productosService.getProductosObservable().subscribe(productos => {
      this.lproductos = productos;
    })
  }

  getProductosPromise(): void{
    this.productosService.getProductosPromise().then( productos => {
      this.lproductos = productos;
    })
  }
  async addProducto() {
    const response = await this.productosService.addProducto(this.producto);
    console.log(response);
  }

  async deleteProducto(producto: Producto) {
    const response = await this.productosService.deleteProducto(producto);
    //console.log(response);
  }

  async updateProducto(producto: Producto) {
    const response = await this.productosService.updateProducto(producto);
    console.log(response);
  }

  onRowEditInit(producto: Producto) {
    this.clonedProductos[producto.id as string] = { ...producto };
  }

  onRowEditSave(producto: Producto) {
    this.updateProducto(producto);
    this.messageService.add({ severity: 'success', summary: '¡Muy bien! ', detail: 'Producto actualizado' });
    this.getProductosPromise();
  }

  onRowEditCancel(producto: Producto, index: number) {
    this.lproductos[index] = this.clonedProductos[producto.id as string];
    delete this.clonedProductos[producto.id as string];
    this.messageService.add({ severity: 'warn', summary: 'Ops!!', detail: 'Producto no fue actualizado!' });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar los registros seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProductos.forEach(element => {
          this.deleteProducto(element);
        });
        this.messageService.add({ severity: 'success', summary: '¡Muy bien!', detail: 'Productos han sido eliminados', life: 3000 });
        this.getProductosPromise();
      }
    });
  }

}
