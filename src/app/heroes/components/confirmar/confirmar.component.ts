import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Heroe) { }

  ngOnInit(): void {
    console.log(this.data)
  }


  borrar(){
    this.dialogRef.close(true);
  } 
  
  
  cerrar(){
    this.dialogRef.close();
  }

}
