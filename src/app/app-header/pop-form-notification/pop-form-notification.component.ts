import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopupModel} from "../../cancion/models/popup-model";
import {NotificationModel} from "../model/notification-model";
import {Cancion} from "../../cancion/cancion";
import {ToastrService} from "ngx-toastr";
import {UsuarioService} from "../../usuario/usuario.service";

@Component({
  selector: 'app-pop-form-notification',
  templateUrl: './pop-form-notification.component.html',
  styleUrls: ['./pop-form-notification.component.css']
})
export class PopFormNotificationComponent implements OnInit {
  @Output() popup = new EventEmitter<PopupModel>();
  @Output() idMusic = new EventEmitter<number>();
  @Input() notification: Array<NotificationModel>;
  @Input() cancion: Cancion[];
  @Input() token: string;
  private popupElement = new PopupModel(false, false, '');
  constructor(private toastr: ToastrService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.popupElement = new PopupModel(false, true, this.popupElement.text );
    this.popup.emit(this.popupElement);
  }

  getName(id:number): string {
    const item = this.cancion.filter(music => music.id === id);
    return item.length >0 ? item[0].titulo : 'N/A'
  }

  checkRead(id: number) {
    const item = this.notification.filter(notification => notification.id === id);

    if( item.length >  0 && item[0].mensaje_leido === false) {
      this.usuarioService.readNotification(id, this.token)
        .subscribe(result => {
          this.toastr.info('Fue actualizada con exito', "Solicitud exitosa");
        })
    } else {
      this.toastr.error('Ya se encuentra actualizada', "Solicitud fallida")
    }
  }

  getIcon(id:number){
    const item = this.notification.filter(notification => notification.id === id);
    return item.length >  0 && item[0].mensaje_leido ? 'read.svg': 'visibility_black_24dp.svg'
  }

}
