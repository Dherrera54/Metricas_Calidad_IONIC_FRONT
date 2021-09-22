import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  constructor(
    private cancionService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  cancionId:number
  canciones: Array<Cancion>
  mostrarCanciones: Array<Cancion>
  cancionesCompartidas: Array<Cancion>
  cancionSeleccionada: Cancion
  indiceSeleccionado: number = 0

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.cancionService.currentMessage.subscribe(cancionID => this.cancionId=cancionID)
      this.getCanciones();
    }
  }

  getCanciones():void{
    this.cancionService.getCancionesPorUsuario(this.userId, this.token)
    .subscribe(canciones => {
      this.canciones = canciones
      this.mostrarCanciones = canciones
    })
    this.cancionService.getCancionesCompartidasUsuario(this.userId, this.token)
    .subscribe(canciones => {
      this.cancionesCompartidas = canciones
      if (canciones !== undefined)
      {
        for (var index in canciones)
        {
          this.mostrarCanciones.push(canciones[index])
        }
      }
      this.onSelect(this.mostrarCanciones[0], 0)
    })
  }


  onSelect(cancion: Cancion, indice: number){
    this.indiceSeleccionado = indice
    this.cancionSeleccionada = cancion
    this.shareSongId(cancion.id)
    this.cancionService.getAlbumesCancion(cancion.id)
    .subscribe(albumes => {
      this.cancionSeleccionada.albumes = albumes
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    })

  }
  shareSongId(songID:number){
  this.cancionService.shareCancionId(songID)
  }

  buscarCancion(busqueda: string){
    let cancionesBusqueda: Array<Cancion> = []
    this.canciones.map( cancion => {
      if(cancion.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())){
        cancionesBusqueda.push(cancion)
      }
    })
    this.mostrarCanciones = cancionesBusqueda
  }

  eliminarCancion(){
    this.cancionService.eliminarCancion(this.cancionSeleccionada.id)
    .subscribe(cancion => {
      this.ngOnInit()
      this.showSuccess()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  irCrearCancion(){
    this.routerPath.navigate([`/canciones/create/${this.userId}/${this.token}`])
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
  }

}
