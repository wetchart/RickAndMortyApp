import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Character } from '../app/Models/character.model';
import { RickandmortyService } from './Servicies/rickandmorty.service';
import { CharacterComponent } from './Cards/character/character.component';
import { PaginatorComponent } from "./paginator/paginator.component";

@Component({
  selector: 'app-root-w',
  imports: [RouterOutlet, ThemeToggleComponent, MatProgressSpinnerModule, CharacterComponent, PaginatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = signal('Rick and Morty App');
  //titleRick = '';
  // hello() {
  //   this.titleRick = 'Rick and Morty App';
  //   return this.titleRick
  // }

  loading = true;
  characters?: Character[];
  previousPage?: string;
  nextPage?: string;

  constructor(private rickandmortyService: RickandmortyService) { }

  ngOnInit() {
    this.getCharacters("");
  }

  public getCharacters(page: string){
    this.loading = true; // Establecer en true antes de cargar los datos
    this.rickandmortyService.getCharacters(page).subscribe({
      next: (data) => {
        this.previousPage = data.info?.prev ? data.info?.prev : "";
        this.nextPage = data.info?.next ? data.info?.next : "";
        this.characters = data.results;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Info de la API obtenida con éxito');
        this.loading = false; // Establecer en false después de cargar los datos
      }
    });
  }

  reloadCharacters(newCharacters: Character[]) {
    this.characters = newCharacters;
  }

}
