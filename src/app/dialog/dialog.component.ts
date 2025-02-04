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
  texto: string = 'No';
  contador: number = 0;
  agrandarFlechas: boolean = false; // Variable para agrandar las flechas
  agrandarBotonSi: boolean = false; // Variable para agrandar el botón "Sí"

  falso = false;

  constructor(private botonEventoService: BotonEventoService) {}

  @ViewChild('titulo') tituloRef!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.tituloRef.nativeElement.focus();
    }, 0);
  }

  moverBotonNo() {
    const btnNo = document.getElementById('btnNoMover');
    const dialog = document.querySelector('mat-dialog-content');

    if (btnNo && dialog) {
      const dialogRect = dialog.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();

      let newX = Math.random() * (dialogRect.width - btnRect.width);

      btnNo.style.position = 'absolute';
      btnNo.style.left = `${newX}px`;
    }
  }

  btnSiclick() {
    this.botonEventoService.notificarBotonClickeado();

    this.btnSi = true;
    this.btnNo = false;
    this.agrandarFlechas = false; // Restauramos el tamaño de las flechas
    this.agrandarBotonSi = false; // Restauramos el tamaño del botón "Sí"

    // Restaurar la posición original del botón "No"
    const btnNo = document.getElementById('btnNoMover');
    if (btnNo) {
      btnNo.style.position = 'static';
    }
    this.texto = "No";
  }

  btnNoclick() {
    this.contador++;
    this.moverBotonNo();
    this.btnNo = true;

    switch (this.contador) {
      case 1:
        this.texto = 'NOOO ERA EL OTRO';
        this.agrandarFlechas = true;
        this.agrandarBotonSi = true; // Aumentamos el tamaño del botón "Sí"
        break;
      case 2:
        this.texto = 'ESTAS SEGURA QUE QUERIAS DECIR NO?';
        this.agrandarFlechas = true;
        this.agrandarBotonSi = true;
        break;
      case 3:
        this.texto = 'SEGURA?';
        this.agrandarFlechas = true;
        this.agrandarBotonSi = true;
        break;
      case 4:
        this.texto = 'SEGURITA SEGURITA?';
        this.agrandarFlechas = true;
        this.agrandarBotonSi = true;
        break;
      case 5:
        this.texto = 'TOTALMENTE SEGURA?';
        this.agrandarFlechas = true;
        this.agrandarBotonSi = true;
        break;
      case 6:
        this.texto = 'ESTA BIEN PS';
        this.agrandarFlechas = false;
        this.agrandarBotonSi = false;
        break;
    }
    if(this.contador >= 6) {
      this.contador = 0;
      this.falso = true;
    }
  }
}
