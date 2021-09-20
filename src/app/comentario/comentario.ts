export class Comentario {
  id:number;
  comentario:string;
  usuario: number;

  constructor(
    id:number,
    comentario:string,
    usuario: number

  ){
    this.id = id,
    this.comentario = comentario,
    this.usuario = usuario
  }

}
