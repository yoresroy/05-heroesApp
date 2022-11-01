import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, Observable } from 'rxjs';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(private activatedRoute: ActivatedRoute, private heroesService:HeroesService) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap( ({sour}) => { 
        console.log(sour)
        return new Observable<string>(sour) 
      } )
    ).subscribe( res => {
      console.log(res)
    });

    /*
    this.activatedRoute.params.subscribe( ({id}) => {
      console.log(id);
      
    });
    */
    
  }

}
