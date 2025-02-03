import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BotonEventoService } from '../boton-evento.service';
import { ExplosionComponent } from "../explosion/explosion.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ExplosionComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements AfterViewInit {
   btnSi: boolean = false;
   btnNo: boolean = false;

   constructor( private botonEventoService: BotonEventoService) {}
   @ViewChild('titulo') tituloRef!: ElementRef;

   ngAfterViewInit() {
     setTimeout(() => {
       this.tituloRef.nativeElement.focus();
     }, 0); // Retrasa un poco para que Angular termine de renderizar
   }
  btnSiclick() {
    this.botonEventoService.notificarBotonClickeado();
    this.btnSi = true;
    this.btnNo = false;  // Asegura que btnNo es false
  }

  btnNoclick() {
    this.btnSi = false;
    this.btnNo = true;  // Asegura que btnSi es false
  }

}
