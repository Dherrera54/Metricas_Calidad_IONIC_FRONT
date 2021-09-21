import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../comentario';
import { ComentarioCancionService } from '../comentario-cancion.service';
import { Cancion } from '../../cancion/cancion';

@Component({
  selector: 'app-comentario-cancion-list',
  templateUrl: './comentario-cancion-list.component.html',
  styleUrls: ['./comentario-cancion-list.component.css']
})
export class ComentarioCancionListComponent implements OnInit {
  @Input() cancion: Cancion;

  userId: number
  token: string

  constructor(
    private comentarioService: ComentarioCancionService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit():void {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.getComments(this.cancion)
  }
  getComments(cancion:Cancion)
  {

  }

}
