import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  heroes:Heroe[] = [];

  constructor(private heroesServise: HeroesService) { }

  ngOnInit(): void {
    this.heroesServise.getHeroes().subscribe( heroes =>  {
        this.heroes = heroes;
    } )
  }

}
