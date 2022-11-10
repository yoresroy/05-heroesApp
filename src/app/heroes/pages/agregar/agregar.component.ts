import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe:Heroe = {
    superhero : '',
    alter_ego : '',
    characters : '',
    first_appearance : '',
    publisher : Publisher.DCComics,
    alt_img : '',
  }
  
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if ( !this.router.url.includes('editar') ) {
      return;
    }
    this.activatedRoute.params
      .pipe(  
        switchMap( ({id}) => this.heroesService.getHeroe(id) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  guardar(){
    if ( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => console.log('Actualizando', heroe) )
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe( resp => {
        this.router.navigate(['/heroes/editar', this.heroe.id])
      });
    }
    console.log(this.heroe);
  }

}
