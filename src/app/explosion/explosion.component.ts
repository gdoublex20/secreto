import { BotonEventoService } from './../boton-evento.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explosion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explosion.component.html',
  styleUrls: ['./explosion.component.css']
})
export class ExplosionComponent implements OnInit {
  particles: { src: string, style: any, x: number, y: number, vx: number, vy: number }[] = [];
  gravity = 0.1; // Gravedad para que caigan
  friction = 0.99; // Fricción para reducir la velocidad
  particleSize = 50; // Tamaño de los GIFs

  constructor(private botonEventoService:BotonEventoService){}

  ngOnInit(): void {
    this.botonEventoService.botonClickeado$.subscribe(() => {
      this.ejecutarAnimacion();
    });

  }

  ejecutarAnimacion(){
    this.createWave(); // Iniciar el efecto de ola/explosión
    this.animate(); // Iniciar la animación
  }

  createWave(): void {
    const particleCount = 30; // Número de partículas (aumenta este número)
    for (let i = 0; i < particleCount; i++) {
      const startX = Math.random() * window.innerWidth; // Posición horizontal aleatoria
      const startY = Math.random() * window.innerHeight; // Posición vertical aleatoria

      this.particles.push({
        src: 'assets/mingyu3.gif', // Ruta al GIF
        style: {
          left: `${startX}px`,
          top: `${startY}px`,
        },
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 10, // Velocidad horizontal aleatoria
        vy: (Math.random() - 0.5) * 10, // Velocidad vertical aleatoria
      });
    }
  }

  animate(): void {
    const animateFrame = () => {
      this.particles.forEach(particle => {
        // Aplicar gravedad
        particle.vy += this.gravity;

        // Aplicar fricción
        particle.vx *= this.friction;
        particle.vy *= this.friction;

        // Mover partícula
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar contra los bordes de la pantalla
        if (particle.x + this.particleSize > window.innerWidth || particle.x < 0) {
          particle.vx *= -1; // Invertir velocidad horizontal
        }
        if (particle.y + this.particleSize > window.innerHeight || particle.y < 0) {
          particle.vy *= -1; // Invertir velocidad vertical
        }

        // Actualizar posición en pantalla
        particle.style.left = `${particle.x}px`;
        particle.style.top = `${particle.y}px`;
      });

      // Continuar la animación
      requestAnimationFrame(animateFrame);
    };

    // Iniciar la animación
    animateFrame();
  }
}
