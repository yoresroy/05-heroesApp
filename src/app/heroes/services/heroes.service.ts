import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private http: HttpClient ) { }

  getHeroes(){
    return this.http.get<Heroe[]>('http://localhost:3000/heroes')
  }

}
