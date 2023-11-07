import { Component } from '@angular/core';
import Orden from 'src/app/interfaces/orden.interface';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {
  constructor(private ordenesService: OrdenesService) {
  }

  [x: string]: any;
  d1 = new Date();
  d2 = new Date();
  lregistros!: Orden[];
  lregistrosorden: any[]=[];
  selectedOrden!: Orden;
  ordenDialogo: boolean = false;

  ngOnInit(): void {
    let d = new Date();
    d.setHours(d.getHours() - 5);
    this.d1 = this.d2 = d;
  }

  Buscar() {
    this.ordenesService.queryOrdenesPorFecha(this.d1, this.d2).then(resp => {
      this.lregistros = resp;
    });
  }

  hideDialog() {
    this.ordenDialogo = false;
    //this.selectedOrden = undefined;
  }

  onRowSelect(event: any) {
    //this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
    console.log(event.data.secuencial);
    this.lregistrosorden = [];
    const lista = this.lregistros;
    const orden = lista.filter(x=> x.secuencial == event.data.secuencial);
    this.lregistrosorden = orden[0].productos;

    
    console.log(this.lregistrosorden);

    this.ordenDialogo = true;
  }

  onRowUnselect(event: any) {
    //this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
  }

  applyFilterGlobal($event: any, stringVal: any, dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
 }
  
}
