import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { Cancion } from './cancion';
import { Album } from '../album/album';
import {SharedAlbumModel} from "./models/shared-album-model";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private backUrl: string = environment.URL_PRODUCTION

  private messageSource = new BehaviorSubject<number>(-1)

currentMessage =this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  shareCancionId(id: number){
    this.messageSource.next(id)

  }
  getNotificacion(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  getCanciones(usuario: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/usuario/${usuario}/canciones`, {headers: headers})
  }

  getCancionesCompartidasUsuario(usuario: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/usuario/${usuario}/cancionescompartidas`, {headers: headers})
  }


  getCancionesPorUsuario(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/usuario/${idAlbum}/canciones`, {headers: headers})
  }

  getAlbumesCancion(cancionId: number): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.backUrl}/cancion/${cancionId}/albumes`)
  }

  crearCancion(idUsuario: number, token: string, cancion: Cancion):Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Cancion>(`${this.backUrl}/usuario/${idUsuario}/canciones`, cancion, {headers: headers})
  }

  crearCancionPorUsuario(idUsuario: number, cancion: Cancion, token: string):Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Cancion>(`${this.backUrl}/usuario/${idUsuario}/canciones`, cancion, {headers: headers})
  }

  getCancion(cancionId: number): Observable<Cancion>{
    return this.http.get<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  editarCancion(cancion: Cancion, cancionId: number):Observable<Cancion>{
    return this.http.put<Cancion>(`${this.backUrl}/cancion/${cancionId}`, cancion)
  }

  eliminarCancion(cancionId: number): Observable<Cancion>{
    return this.http.delete<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  compartirFavoritos(sharedAlbumModel: SharedAlbumModel, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(`${this.backUrl}/cancion/${sharedAlbumModel.idCancion}/usuarios`, sharedAlbumModel, {headers: headers})
  }

}
