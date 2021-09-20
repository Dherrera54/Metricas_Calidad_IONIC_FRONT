import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario } from '../comentario';
import { ComentarioCancionService } from '../comentario-cancion.service';
import { Cancion } from '../../cancion/cancion';
@Component({
  selector: 'app-comentario-cancion-create',
  templateUrl: './comentario-cancion-create.component.html',
  styleUrls: ['./comentario-cancion-create.component.css']
})
export class ComentarioCancionCreateComponent implements OnInit {

  @Input() cancion: Cancion;

  userId: number
  token: string
  comentarioForm: FormGroup


  constructor(
    private comentarioService: ComentarioCancionService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.comentarioForm = this.formBuilder.group({
      comentario:["", [Validators.required, Validators.maxLength(255)]]
    })
  }
  createComment( newComment :Comentario){

    this.comentarioService.crearComentarioCancion(this.userId, this.cancion.id, newComment, this.token)
    .subscribe(comentario => {
      this.showSuccess()
      this.comentarioForm.reset()
  },
  error=> {
    if(error.statusText === "UNAUTHORIZED"){
      this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    }
    else if(error.statusText === "UNPROCESSABLE ENTITY"){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.showError("Ha ocurrido un error. " + error.message)
    }
  })

}
showError(error: string){
  this.toastr.error(error, "Error")
}

showWarning(warning: string){
  this.toastr.warning(warning, "Error de autenticación")
}

showSuccess() {
  this.toastr.success(`Comentario creado con exito en ${this.cancion.titulo} `, "Creación exitosa");
}

}
