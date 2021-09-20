import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from './usuario';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    private backUrl: string = environment.URL_PRODUCTION
    constructor(private http: HttpClient) { }

    userLogIn(nombre: string, contrasena: string):Observable<any>{
        return this.http.post<any>(`${this.backUrl}/logIn`, {"nombre": nombre, "contrasena": contrasena });
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

}
