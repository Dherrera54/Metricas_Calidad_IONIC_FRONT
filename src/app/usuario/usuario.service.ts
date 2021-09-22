import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from './usuario';
import {Cancion} from "../cancion/cancion";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    private backUrl: string = "https://ionicgrupo3.herokuapp.com"

    constructor(private http: HttpClient) { }

    userLogIn(nombre: string, contrasena: string):Observable<any>{
        return this.http.post<any>(`${this.backUrl}/logIn`, {"nombre": nombre, "contrasena": contrasena });
    }

    getNotification(userId: number):Observable<any>{
       return this.http.get<any>(`${this.backUrl}/usuario/${userId}/notificaciones`, {});
    }

    userSignUp(nombre: string, contrasena: string): Observable<any>{
        return this.http.post<any>(`${this.backUrl}/signin`, {"nombre": nombre, "contrasena": contrasena})
    }
    getUsuario(usuario: number, token:string): Observable<Usuario>{
        const headers = new HttpHeaders({
          'Authorization':`Bearer ${token}`
        })
        return this.http.get<Usuario>(`${this.backUrl}/usuario/${usuario}`, {headers: headers})
    }


  getCanciones(usuario: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/usuario/${usuario}/canciones`, {headers: headers})
  }

  readNotification(id: number, token: string): Observable<Cancion[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Cancion[]>(`${this.backUrl}/notificacion/${id}`, {headers: headers})
  }
}
