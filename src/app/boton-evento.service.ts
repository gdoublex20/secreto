import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotonEventoService {

  private botonClickeadoSource = new Subject<void>();
  botonClickeado$ = this.botonClickeadoSource.asObservable();

  // Método para emitir el evento
  notificarBotonClickeado() {
    this.botonClickeadoSource.next();
  }
}
