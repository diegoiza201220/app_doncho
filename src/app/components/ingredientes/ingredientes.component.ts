import { Component } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import Ingrediente from 'src/app/interfaces/ingrediente.interface';
import { IngredientesService } from 'src/app/services/ingredientes.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class IngredientesComponent {

  ingrediente!: Ingrediente;
  lingredientes: Ingrediente[] = [];
  clonedIngredientes: { [s: string]: Ingrediente } = {};
  selectedIngredientes!: Ingrediente[];
  submitted!: boolean;
  ingredienteDialogo!: boolean;

  lfamilia: SelectItem[] = [
    { label: 'Aliños', value: 'ALINOS' },
    { label: 'Carnes', value: 'CARNES' },
    { label: 'Enlatados', value: 'ENLATADOS' },
    { label: 'Frutas', value: 'FRUTAS' },
    { label: 'Lacteos', value: 'LACTEOS' },
    { label: 'Mariscos', value: 'MARISCOS' },
    { label: 'Vegetales', value: 'VEGETALES' },
  ];

  lubicacion: SelectItem[] = [
    { label: 'Alacena', value: 'ALACENA' },
    { label: 'Congelador', value: 'CONGELADOR' },
    { label: 'Barra', value: 'BARRA' },
    { label: 'Cocina', value: 'COCINA' }
  ];

  lunidad: SelectItem[] = [
    { label: 'Unidad', value: 'UNIDAD' },
    { label: 'Gramos', value: 'GRAMOS' }
  ];

  constructor(private ingredientesService: IngredientesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getIngredientesObserver();
  }

  openNew() {
    this.ingrediente = { nombre: '', familia: '', ubicacion: '', unidad: '' };
    this.submitted = false;
    this.ingredienteDialogo = true;
  }

  hideDialog() {
    this.ingredienteDialogo = false;
    this.submitted = false;
  }

  saveIngrediente() {
    this.submitted = true;
    this.addIngrediente();
    this.messageService.add({ severity: 'success', summary: '¡Muy bien! ', detail: 'Ingrediente creado' });
    this.ingredienteDialogo = false;
  }


  getIngredientesObserver(): void {
    this.ingredientesService.getIngredientesObservable().subscribe(ingredientes => {
      this.lingredientes = ingredientes;
    })
  }

  async addIngrediente() {
    const response = await this.ingredientesService.addIngrediente(this.ingrediente);
  }

  async deleteIngrediente(ingrediente: Ingrediente) {
    const response = await this.ingredientesService.deleteIngrediente(ingrediente);
  }

  async updateIngrediente(ingrediente: Ingrediente) {
    const response = await this.ingredientesService.updateIngrediente(ingrediente);
  }

  onRowEditInit(ingrediente: Ingrediente) {
    this.clonedIngredientes[ingrediente.id as string] = { ...ingrediente };
  }

  onRowEditSave(ingrediente: Ingrediente) {
    this.updateIngrediente(ingrediente);
    this.messageService.add({ severity: 'success', summary: '¡Muy bien! ', detail: 'Ingrediente actualizado' });
  }

  onRowEditCancel(ingrediente: Ingrediente, index: number) {
    this.lingredientes[index] = this.clonedIngredientes[ingrediente.id as string];
    delete this.clonedIngredientes[ingrediente.id as string];
    this.messageService.add({ severity: 'warn', summary: 'Ops!!', detail: 'Ingrediente no fue actualizado!' });
  }

  deleteSelectedIngredientes() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar los registros seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedIngredientes.forEach(element => {
          this.deleteIngrediente(element);
        });
        this.messageService.add({ severity: 'success', summary: '¡Muy bien!', detail: 'Ingredientes han sido eliminados', life: 3000 });
      }
    });
  }


}
