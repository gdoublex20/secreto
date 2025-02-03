import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-luciernagas',
  templateUrl: './luciernagas.component.html',
  styleUrls: ['./luciernagas.component.css'],
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación de estilos
})
export class LuciernagasComponent implements OnInit {
  totalFireflies = 50; // Total de luciérnagas
  currentFireflies = 0; // Luciérnagas actuales
  fireflies: HTMLElement[] = []; // Lista de luciérnagas

  ngOnInit(): void {
    this.addFireflies(10); // Inicia con 10 luciérnagas
    this.startCreatingFireflies(); // Inicia el intervalo de creación
    this.startRemovingFireflies(); // Inicia el intervalo de eliminación
  }

  // Inicia el intervalo para crear luciérnagas cada 2 segundos
  startCreatingFireflies(): void {
    const creationInterval = setInterval(() => {
      if (this.currentFireflies < this.totalFireflies) {
        // Genera un número aleatorio entre 3 y 5
        const randomCount = Math.floor(Math.random() * 3) + 3;
        this.addFireflies(randomCount); // Añade un número aleatorio de luciérnagas
      }
    }, 2000); // Crear luciérnagas cada 2 segundos
  }

  // Inicia el intervalo para borrar luciérnagas cada 5 segundos
  startRemovingFireflies(): void {
    setInterval(() => {
      if (this.currentFireflies > 0) {
        this.borrarLuciernaga(); // Borra luciérnagas cada 5 segundos
      }
    }, 5000); // Borrar luciérnagas cada 5 segundos
  }

  // Añade un grupo de luciérnagas
  addFireflies(count: number): void {
    for (let i = 0; i < count; i++) {
      this.createFirefly();
    }
  }

  // Crea una luciérnaga y la anima
  createFirefly(): void {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    document.body.appendChild(firefly);

    // Posición inicial aleatoria
    firefly.style.left = `${Math.random() * 100}vw`;
    firefly.style.top = `${Math.random() * 100}vh`;

    // Animación de movimiento y brillo
    this.animateFirefly(firefly);

    this.fireflies.push(firefly);
    this.currentFireflies++;
  }

  // Borra luciérnagas
  borrarLuciernaga(): void {
    if (this.currentFireflies > 0) {
      // Genera un número aleatorio entre 1 y 3
      const numToRemove = Math.floor(Math.random() * 4) + 2;

      // Asegúrate de no eliminar más luciérnagas de las que hay
      const actualRemovals = Math.min(numToRemove, this.currentFireflies);

      for (let i = 0; i < actualRemovals; i++) {
        const firefly = this.fireflies.shift(); // Elimina la primera luciérnaga del array
        if (firefly) {
          firefly.remove(); // Elimina la luciérnaga del DOM
          this.currentFireflies--;
        }
      }
    }
  }

  // Anima la luciérnaga
  animateFirefly(firefly: HTMLElement): void {
    const duration = Math.random() * 5 + 5; // Duración de la animación
    const delay = Math.random() * 5; // Retraso inicial

    firefly.style.animationDuration = `${duration}s`;
    firefly.style.animationDelay = `${delay}s`;
  }
}

