import { BotonEventoService } from './../boton-evento.service';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements AfterViewInit, OnInit {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  private audioPlayed = false; // Para evitar reproducir múltiples veces

  canciones = [
    { nombre: 'Canción 1', ruta: 'assets/nice.mp3' },
    { nombre: 'Canción 2', ruta: 'assets/homerun.mp3' }
  ];

  cancionActualIndex = 0;

  constructor(private botonEventoService: BotonEventoService) {}
  ngOnInit(): void {
    this.botonEventoService.musicaClick$.subscribe(() => {
      this.configurarReproduccionAutomatica();
    })
  }

  ngAfterViewInit(): void {
    this.configurarReproduccionAutomatica();
  }

  configurarReproduccionAutomatica() {
    const audio = this.audioPlayerRef.nativeElement;
    audio.volume = 0.1; // Establece el volumen al 10%
    audio.src = this.canciones[this.cancionActualIndex].ruta;

    // Reproduce el audio en silencio primero
    audio.play().then(() => {
      audio.muted = false; // Desactivar el mute después de comenzar la reproducción
    }).catch(error => {
      console.error('El navegador bloqueó la reproducción automática:', error);
    });
  }

  siguienteCancion() {
    this.cancionActualIndex = (this.cancionActualIndex + 1) % this.canciones.length;
  }
}
