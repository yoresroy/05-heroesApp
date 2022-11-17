import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment' ; 
import {  HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth():Auth{
    return{...this._auth!}
  }

  constructor(private http: HttpClient) { }

  login(  ){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
        .pipe(
          tap( auth => this._auth = auth )
        );

  }

}
