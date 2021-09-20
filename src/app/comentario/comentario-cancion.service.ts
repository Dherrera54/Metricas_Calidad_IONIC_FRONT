import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComentarioCancionService {

  private backUrl: string = environment.URL_PRODUCTION

  constructor(private http: HttpClient) { }

  crearComentarioCancion(idUsuario: number, idCancion: number, comentario:Comentario, token: string):Observable<Comentario>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Comentario>(`${this.backUrl}/cancion/${idCancion}/usuario/${idUsuario}/comentarios`, comentario, {headers: headers})
  }

}
