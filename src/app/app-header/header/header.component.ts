import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '../../usuario/usuario';
import {NotificationModel} from "../model/notification-model";
import {PopupModel} from "../../cancion/models/popup-model";
import {SharedAlbumModel} from "../../cancion/models/shared-album-model";
import {Cancion} from "../../cancion/cancion";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy  {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private usuarioService: UsuarioService
    ) { }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  stateShare: boolean = false;
  userId: number;
  message: string;
  token: string;
  usuarioSeleccionado: Usuario;
  notification: Array<NotificationModel>;
  cancion: Cancion[];
  interval:any;


  ngOnInit(): void {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getUsuario();
      this.startTimer();
  }

  getUsuario():void{
    this.usuarioService.getUsuario(this.userId, this.token)
    .subscribe(usuario =>{
      this.usuarioSeleccionado=usuario;})

  }

  startTimer() {
    this.interval = setInterval(() => {
      this.usuarioService.getNotification(this.userId)
        .subscribe(result =>{
           this.notification = result;
           const filter = this.notification
            .filter((notification: NotificationModel) => notification.mensaje_leido === false);
           this.message = filter.length + ' notificacion';
        })
    },1000)
  }


  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if(menu === "logIn"){
      this.routerPath.navigate([`/`])
    }
    else if(menu === "album"){
      this.routerPath.navigate([`/albumes/${userId}/${token}`])
    }
    else if(menu === "cancion"){
      this.routerPath.navigate([`/canciones/${userId}/${token}`])
    }
    else if(menu === "perfilUsuario"){
      this.routerPath.navigate([`/perfil/${userId}/${token}`])
    }

  }

  showModal() {
      this.usuarioService.getCanciones(this.userId, this.token)
        .subscribe(result => {
          this.cancion = result;
          this.stateShare = true;
        })
  }

  processPopup(model: PopupModel) {
    if(model.cancelBtn) {
      this.stateShare = false;
      return;
    }

    if(model.acceptBtn) {
    }
  }

}
