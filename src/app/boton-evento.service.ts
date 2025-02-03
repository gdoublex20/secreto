import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotonEventoService {

  private botonClickeadoSource = new Subject<void>();
  botonClickeado$ = this.botonClickeadoSource.asObservable();


  private musica = new Subject<void>();
  musicaClick$ = this.musica.asObservable();

  // Método para emitir el evento
  notificarBotonClickeado() {
    this.botonClickeadoSource.next();
  }

  musicaClickEvent() {
    this.musica.next();
  }
}
