export default interface Orden {
    id?: string;
    fecha: Date;
    secuencial: number;
    cliente: string;
    ruc: string;
    direccion: string;
    email: string;
    telefono: string;
    tipodepago: string;
    documentopago: string;
    totalorden: number,
    productos: [{
        cantidad?: number,
        plato?: string,
        preciounitario?: number,
        preciototal?: number,
        pedidoacocina?: boolean
    }]
}