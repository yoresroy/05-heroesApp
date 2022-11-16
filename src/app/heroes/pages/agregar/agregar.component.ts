import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  [x: string]: any;

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
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
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
        .subscribe(heroe => this.moatrarSnackBar('Registro actualizado') )
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe( resp => {
        this.router.navigate(['/heroes/editar', resp.id]);
        this.moatrarSnackBar('Registro creado');
      });
    }
    console.log(this.heroe);
  }

  borrarHeroe(){
    const dialog = this.matDialog.open( ConfirmarComponent, {
        width: '250px',
        data: this.heroe
      });

    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ) {
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
          });
        }
        console.log(result);
      }
    );
  }

  moatrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje,'Ok!', {
      duration : 2500
    });
  }

}
