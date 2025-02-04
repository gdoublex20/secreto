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
  imagenes: string[] = [
    '../assets/sad1.gif',
    '../assets/sad2.gif',
    '../assets/sad3.gif',
    '../assets/sad4.gif',
    '../assets/sad5.gif',
    '../assets/sad6.gif'
  ];
  imgActual: string = '';
  contador: number = 0;
  please: boolean = true;
  gatoSad: boolean = false;
  gatoSenialando: boolean = false;
  gatoSenialando2: boolean = false;
  flecha: boolean = false;
  botonAbajo: boolean = false;
  scaleFactor = 1;
  flecha2 = false;
  mostrarBotones = false;
  btnNoDestruccion = false;
  textoDestruccion = 3;
  explosion: boolean = false;

  falso = false;

  constructor(private botonEventoService: BotonEventoService) {}

  @ViewChild('titulo') tituloRef!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.mostrarBotones = true;
    }, 4000);
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
      btnNo.style.bottom = `170px`;
    }
  }

  btnSiclick() {
    this.botonEventoService.notificarBotonClickeado();

    this.scaleFactor = Math.min(1);
    document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
    this.btnSi = true;
    this.btnNo = false;
    this.please = false;
    this.gatoSad = false;
    this.falso = false;
    this.botonAbajo = false;
    this.gatoSenialando = false;
    this.gatoSenialando2 = false;
    this.flecha = false;
    this.btnNoDestruccion = false;

    this.explosion = false;

    // Restaurar la posición original del botón "No"
    const btnNo = document.getElementById('btnNoMover');
    if (btnNo) {
      btnNo.style.position = 'static';
    }
    this.texto = "No";

    this.enviarCorreo("Sí", "https://tenor.com/es-US/view/hasher-happy-sticker-gif-24532176");

    const interval = setInterval(() => {
        this.explosion = false;
        this.textoDestruccion = 3;
    }, 2000);

  }

  btnNoclick() {

    this.please = false;
    this.contador++;
    this.moverBotonNo();
    this.btnNo = true;

    this.botonAbajo = true;
    switch (this.contador) {
      case 1:
        this.texto = 'NO CONTO PICALE OTRA VEZ';
        this.imgActual = this.imagenes[0];
        this.gatoSad = true;
        this.falso = false;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        break;
      case 2:
        this.texto = 'OTRA';

        this.imgActual = this.imagenes[1];
        this.gatoSad = true;
        this.gatoSenialando = true;
        this.falso = false;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        break;
      case 3:
        this.texto = 'UNA MAS';

        this.imgActual = this.imagenes[2];
        this.gatoSad = true;
        this.flecha2 = true;
        this.falso = false;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        break;
      case 4:
        this.texto = 'UPSIS OTRA';
        this.imgActual = this.imagenes[3];
        this.gatoSad = true;
        this.gatoSenialando2 = true;
        this.falso = false;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        break;
      case 5:
        this.texto = 'ESTA ES LA ULTIMA';
        this.imgActual = this.imagenes[4];
        this.gatoSad = true;
        this.falso = false;
        this.flecha = true;
        this.flecha2 = false;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        break;
      case 6:
        this.imgActual = this.imagenes[5];
        this.gatoSad = true;
        this.scaleFactor = Math.min(this.scaleFactor + 0.2, 2.5);
        document.documentElement.style.setProperty('--scale-factor', this.scaleFactor.toString());
        this.btnNoDestruccion = true;
        const interval = setInterval(() => {
          this.textoDestruccion--;

          if (this.textoDestruccion < 1) {
            this.explosion = true;
            this.textoDestruccion = 3;
       this.enviarCorreo("No", "https://tenor.com/es-US/view/bubu-yier-bubu-dudu-dudu-duddu-gif-1706873183702771014");

          }
        }, 1000);
        break;
    }
    if(this.contador >= 6) {
      this.contador = 0;
      this.falso = true;
      this.gatoSad = false;
    }
  }

  enviarCorreo(respuesta: string, gif: string) {
    const formData = new FormData();
    formData.append("_captcha", "false"); // Desactivar captcha
    formData.append("_template", "table"); // Plantilla de tabla en FormSubmit
    formData.append("respuesta", respuesta);

    // Mensaje con imagen en HTML
    const mensajeHTML = `
      <h2>${respuesta === "Sí" ? "¡Dijiste que SÍ! 🎉" : "Dijiste que NO 😢"}</h2>
      <img src="${gif}" alt="GIF" style="max-width: 300px; border-radius: 10px;">
    `;
    formData.append("mensaje", mensajeHTML);

    fetch("https://formsubmit.co/gdoublex10@gmail.com", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Correo enviado con éxito");
      } else {
        console.error("Error al enviar el correo");
      }
    })
    .catch(error => console.error("Error en la solicitud:", error));
  }


}
