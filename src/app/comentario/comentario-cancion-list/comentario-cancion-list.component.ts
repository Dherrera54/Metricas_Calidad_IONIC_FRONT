import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../comentario';
import { ComentarioCancionService } from '../comentario-cancion.service';
import { Cancion } from '../../cancion/cancion';
import { CancionService } from '../../cancion/cancion.service';

@Component({
  selector: 'app-comentario-cancion-list',
  templateUrl: './comentario-cancion-list.component.html',
  styleUrls: ['./comentario-cancion-list.component.css']
})
export class ComentarioCancionListComponent implements OnInit {

  @Input() cancion: Cancion;


  userId: number
  token: string
  cancionId: number
  comentarios: Array<Comentario>
  mostrarComentarios: Array<Comentario>

  constructor(
    private comentarioService: ComentarioCancionService,
    private cancionService:CancionService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit():void {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.cancionService.currentMessage
    .subscribe(cancionID => {
      this.cancionId=cancionID
      this.getComments()
    })

  }

  getComments()
  {

    this.comentarioService.getComentariosCancion(this.cancionId).subscribe(comentarios =>
      {
        this.comentarios = comentarios
        this.mostrarComentarios = comentarios
      })
  }


}
