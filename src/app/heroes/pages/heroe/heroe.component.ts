import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, Observable, tap } from 'rxjs';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private heroesService: HeroesService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroe(id) )
    )
    .subscribe( heroe => this.heroe = heroe ); 
    
  }

  regresar () {
    this.router.navigate(['/heroes/listado'])
  }

}
