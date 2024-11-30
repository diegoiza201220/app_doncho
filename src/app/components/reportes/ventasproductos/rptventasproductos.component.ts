import { Component } from '@angular/core';
import Orden from 'src/app/interfaces/orden.interface';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { BaseComponent } from 'src/app/util/base.component';

@Component({
  selector: 'app-rpt-ventasproductos',
  templateUrl: './rptventasproductos.component.html',
  styleUrls: ['./rptventasproductos.component.css']
})

export class RptVentasproductosComponent extends BaseComponent {

  d1 = new Date();
  d2 = new Date();
  lregistros!: Orden[];


  ldata: any[] = [];
  bgcolor: any[] = [];

  basicDataBar: any;
  basicOptionsBar: any;

  basicDataPie: any;
  basicOptionsPie: any;

  constructor(private ordenesService: OrdenesService, public override authService: AuthService)  {
    super(authService);
  }

  ngOnInit(): void {
    let d = new Date();
    this.d1 = this.d2 = d;
  }

  Buscar() {
    this.ordenesService.queryOrdenesPorFecha(this.fechaToInteger(this.d1), this.fechaToInteger(this.d2)).then(resp => {
      this.lregistros = resp;
    });
  }

  procesarData() {
    this.lregistros.forEach(element => {
      element.productos.forEach(element2 => {
        this.ldata.push({ id: element2.plato, cantidad: element2.cantidad });
      });
    });

    this.procesarDataBar();
    this.procesarDataPie();
  }

  procesarDataPie() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    let ldataPie: any[] = [];

    const result = Object.values(this.ldata.reduce((r, o) => (r[o.id]
      ? (r[o.id].cantidad += o.cantidad)
      : (r[o.id] = { ...o }), r), {}));

    ldataPie = result;

    const label: any[] = [];
    const data: any[] = [];

    ldataPie.sort((a, b) => (a.cantidad > b.cantidad ? -1 : 1));
    ldataPie.forEach(element => {
      label.push(element.id);
      data.push(element.cantidad);
    });

    this.basicDataPie = {
      labels: label,
      datasets: [
        {
          data: data,
          backgroundColor: this.bgcolor,
        }
      ]
    };

    this.basicOptionsPie = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };

  }

  procesarDataBar() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    let ldataBar: any[] = [];

    const result = Object.values(this.ldata.reduce((r, o) => (r[o.id]
      ? (r[o.id].cantidad += o.cantidad)
      : (r[o.id] = { ...o }), r), {}));

    ldataBar = result;
    const label: any[] = [];
    const data: any[] = [];

    ldataBar.sort((a, b) => (a.cantidad > b.cantidad ? -1 : 1));
    ldataBar.forEach(element => {
      label.push(element.id);
      data.push(element.cantidad);
      this.bgcolor.push(this.randomRGB());
    });

    this.basicDataBar = {
      labels: label,
      datasets: [
        {
          label: 'Ventas',
          data: data,
          backgroundColor: this.bgcolor,
          borderWidth: 1
        }
      ]
    };

    this.basicOptionsBar = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  randomRGB(): string {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let RGBColor = "rgb(" + x + "," + y + "," + z + ")";
    return RGBColor;
  }
}
