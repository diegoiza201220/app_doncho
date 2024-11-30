import { Directive } from "@angular/core";
import { AuthService } from "../services/auth.service";
@Directive()
export abstract class BaseComponent {
    
    constructor(public authService: AuthService) {
    }



    fechaToInteger(fecha: Date): number {
        if (this.estaVacio(fecha)) {
            return 0;
        }
        const f = fecha;
        const curr_date = f.getDate();
        const curr_month = f.getMonth() + 1;
        const curr_year = f.getFullYear();
        let monthstr = '' + curr_month;
        let daystr = '' + curr_date;
        if (curr_month < 10) { monthstr = '0' + curr_month; }
        if (curr_date < 10) { daystr = '0' + curr_date; }
        return Number(curr_year + '' + monthstr + '' + daystr);
    }

    /**Transforma una fecha en formato dd-MM-yyyy a una fecha en entero formato yyyyMMdd */
    public formatoFechaToInteger(valor: string): number {
        if (this.estaVacio(valor)) {
            return 0;
        }
        // ejemplo dd-MM-yyyy 31-01-1971    31 de enero del 2017
        const anio = valor.substring(6, 10);
        const mes = valor.substring(3, 5);
        const dia = valor.substring(0, 2);
        const fecha: string = anio + mes + dia;
        return Number(fecha);
    }

    /**Verifica que una variable con tipo de dato basico este vacio, si es un objeto verifica
 * que los atributos esten vacios
 */
    public estaVacio(obj: any): boolean {
        if (obj === undefined || obj === null || obj === '' || (typeof obj === 'object' && !(obj instanceof Date) && Object.keys(obj).length === 0) || obj.length <= 0) {
            return true;
        }
        return false;
    }

    get isloggedIn(): boolean{
        return this.authService.isLoggedIn;
    }
}