import { BotonEventoService } from './../boton-evento.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  animations: [
    trigger('explodeAnimation', [
      state('normal', style({
        transform: 'scale(1)',
        opacity: 1,
      })),
      state('exploded', style({
        transform: 'scale(3)', // Aumenta la escala para un efecto más dramático
        opacity: 0,
      })),
      transition('normal => exploded', animate('500ms ease-out')), // Animación de explotar
    ]),
  ],
})
export class CartaComponent {
  height: number = 30; // Valor inicial de la altura
  private readonly maxHeight: number = 300; // Límite máximo de altura

  private interval: any;
  buttonState: string = 'normal';
  isExploded: boolean = false;
  showCarta: boolean = false;

  constructor(public dialog: MatDialog, private botonEventoService: BotonEventoService) {}

  onButtonClick() {
    this.buttonState = 'exploded'; // Cambia el estado para activar la animación
    setTimeout(() => {
      this.isExploded = true; // Oculta el botón después de la animación
      this.height += 1; // Incrementar la altura en 10px cada segundo
    }, 100); // Duración de la animación

    this.altura();
  }

  altura() {
    this.interval = setInterval(() => {
      if (this.height < this.maxHeight) {
        this.height += 1; // Incrementar la altura en 10px cada segundo
      } else {
        clearInterval(this.interval); // Detener el intervalo cuando se alcanza el límite
        this.showCarta = true;
        this.abrirModal();

      }
    }, 10);

  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      autoFocus: false
    });
}
}
