import { Component } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import Item from 'src/app/interfaces/item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { BaseComponent } from 'src/app/util/base.component';
import Inventarios from 'src/app/interfaces/inventario.interface'
import { InventariosService } from 'src/app/services/inventarios.service';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class InventariosComponent extends BaseComponent {

  constructor(private itemService: ItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private inventarioService: InventariosService,
    private router: Router,
    public override authService: AuthService) {
    super(authService);
  }

  item!: Item;
  litems: any;
  clonedItem: { [s: string]: Item } = {};
  selectedItems!: any[];
  submitted!: boolean;
  itemDialogo!: boolean;

  inventario: any = {};

  ngOnInit(): void {
    this.inventario = {};
    this.inventario.fecha = new Date();
    //this.inventario.total = 0.00;
    this.litems = [];
    this.getItemsPromise();
    this.submitted = false;
    console.info('inventarios init');
  }

  getItemsPromise(): void {
    this.itemService.getItemsPromise().then(items => {
      items.forEach(element => {
        let dat : any = {};
        dat = element;
        dat.existencia = 0;
        this.litems.push(dat);
      });
    })
    
  }

  grabarInventario() {
    this.submitted = true;
    this.inventario.secuencial = 0;
    this.inventario.fechainteger = this.fechaToInteger(this.inventario.fecha);
    this.inventario.usuario = this.authService.userEmail;
    this.inventario.items = [];
    
    this.litems.forEach((ele: any) => {
      if (ele.existencia>0){
        let i : any = {};
        i.id = ele.id;
        i.nombre = ele.nombre;
        i.existencia = ele.existencia;
        this.inventario.items.push(i);
      }
    })

    this.inventarioService.addCompra(this.inventario);
    this.messageService.add({ severity: 'success', summary: '¡Muy bien! ', detail: 'El inventario ha sido registrado' });
  }

  applyFilterGlobal($event: any, stringVal: any, dt: any) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  navigateTo(){
    this.router.navigateByUrl('main');
  }
}
