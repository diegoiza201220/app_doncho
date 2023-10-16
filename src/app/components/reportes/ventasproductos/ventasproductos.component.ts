import { LexerRange } from '@angular/compiler';
import { Component } from '@angular/core';
import Orden from 'src/app/interfaces/orden.interface';
import Ventasproductos from 'src/app/interfaces/ventasproductos.interface';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { from, Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { FormStyle } from '@angular/common';


@Component({
  selector: 'app-ventasproductos',
  templateUrl: './ventasproductos.component.html',
  styleUrls: ['./ventasproductos.component.css']
})

export class VentasproductosComponent {

  d1 = new Date();
  d2 = new Date();
  lregistros!: Orden[];
  ldata: any[] = [];
  //data: any;
  //opciones: any;
  basicData: any;
  basicOptions: any;

  constructor(private ordenesService: OrdenesService) {
  }

  ngOnInit(): void {
    let d = new Date();
    d.setHours(d.getHours() - 5);
    this.d1 = this.d2 = d;
  }

  Buscar() {
    this.ordenesService.queryOrdenesPorFecha(this.d1, this.d2).then(resp => {
      this.lregistros = resp;
    });

    //this.procesarData();
  }

  procesarData() {

    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.lregistros.forEach(element => {
      element.productos.forEach(element2 => {
        this.ldata.push({ id: element2.plato, cantidad: element2.cantidad });
      });
    });
    console.log('ld', this.ldata);

    const result = Object.values(this.ldata.reduce((r, o) => (r[o.id]
      ? (r[o.id].cantidad += o.cantidad)
      : (r[o.id] = { ...o }), r), {}));

    console.log('re', result);
    this.ldata = result;


    const lab : any[] = [];
    const ds : any[]=[];

    this.ldata.forEach(element => {
      lab.push(element.id);
      ds.push(element.cantidad);
    });

    console.log('ld',this.ldata);
    console.log('lab', lab);
    console.log('ds', ds);

    this.basicData = {
      labels: lab,//['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
          {
              label: 'Ventas',
              data: ds,//// [540, 325, 702, 620],
              // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              // borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
  };

  this.basicOptions = {
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
}
