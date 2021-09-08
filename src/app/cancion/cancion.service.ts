import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from './cancion';
import { Album } from '../album/album';
import {SharedAlbumModel} from "./models/shared-album-model";

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private backUrl: string = "https://ionicgrupo3.herokuapp.com"

  constructor(private http: HttpClient) { }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, {headers: headers})
  }

  getCanciones(): Observable<Cancion[]>{
    return this.http.get<Cancion[]>(`${this.backUrl}/canciones`)
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

  crearCancion(cancion: Cancion):Observable<Cancion>{
    return this.http.post<Cancion>(`${this.backUrl}/canciones`, cancion)
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
    console.log(JSON.stringify(sharedAlbumModel));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(`${this.backUrl}/cancion/${sharedAlbumModel.idCancion}/usuarios`, sharedAlbumModel, {headers: headers})
  }

}
