export default interface Compra {
    id?: string;
    fecha: Date;
    secuencial: number;
    numerodocumento: string;
    proveedor: string;
    total: number,
    usuario: string,
    items: [{
        nombre: string,
        cantidad: number,
        preciounitario: string,
        preciototal: number
    }]
}