import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';

  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe( heroes => {
      this.heroes = heroes;
    });
  }

  opcionSeleccionada( even: MatAutocompleteSelectedEvent ){

    if ( !even.option.value ) {
      this.heroeSeleccionado = undefined;
      console.log('No hay valor');
      return;
    }

    const heroe:Heroe = even.option.value;
    console.log(heroe);
    this.termino = heroe.superhero;
    
    this.heroesService.getHeroe( heroe.id! ).subscribe(heroe => this.heroeSeleccionado = heroe);
  
  }



}
