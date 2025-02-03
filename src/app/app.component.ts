import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuciernagasComponent } from "./luciernagas/luciernagas.component";
import { CartaComponent } from "./carta/carta.component";
import { MusicaComponent } from "./musica/musica.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LuciernagasComponent, CartaComponent, MusicaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
