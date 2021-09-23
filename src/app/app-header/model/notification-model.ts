export class NotificationModel {
  fecha:  Date;
  mensaje: string;
  mensaje_leido:boolean;
  ccompartida_id:number;
  id: number;

  constructor(fecha: Date, mensaje: string, mensaje_leido: boolean, ccompartida_id: number, id: number) {
      this.fecha = fecha;
      this.mensaje = mensaje;
      this.mensaje_leido = mensaje_leido;
      this.ccompartida_id = ccompartida_id;
      this.id = id;
  }
}
