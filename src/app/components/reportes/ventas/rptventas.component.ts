import { Component } from '@angular/core';
import Orden from 'src/app/interfaces/orden.interface';
import { OrdenesService } from 'src/app/services/ordenes.service';
//import * as FileSaver from 'file-saver';
import { BaseComponent } from 'src/app/util/base.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rpt-ventas',
  templateUrl: './rptventas.component.html',
  styleUrls: ['./rptventas.component.css']
})
export class RptVentasComponent extends BaseComponent {
  [x: string]: any;

  d1 = new Date();
  d2 = new Date();
  lregistros!: Orden[];

  constructor(private ordenesService: OrdenesService, public override authService: AuthService) {
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

  // exportPdf() {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'px', 'a4');
  //       (doc as any).autoTable(this.exportColumns, this.products);
  //       doc.save('products.pdf');
  //     });
  //   });

  // exportExcel() {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.lregistros);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, 'products');
  //   });
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

  calculateTipodepagoTotal(tipodepago: string) {
    let total = 0;

    if (this.lregistros) {
      for (let registro of this.lregistros) {
        if (registro.tipodepago === tipodepago) {
          total+= registro.totalorden;
        }
      }
    }

    return total;
  }
}


