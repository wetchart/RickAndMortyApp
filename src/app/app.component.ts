import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Character } from '../app/Models/character.model';
import { RickandmortyService } from './Servicies/rickandmorty.service';
import { CharacterComponent } from './Cards/character/character.component';
import { PaginatorComponent } from "./paginator/paginator.component";
import { ThemeService } from './Servicies/theme.service';
import { SeekerComponent } from "./seeker/seeker.component";
import { Info } from './Models/common.model';
import { Console } from 'console';

@Component({
  selector: 'app-root-w',
  imports: [RouterOutlet, ThemeToggleComponent, MatProgressSpinnerModule, CharacterComponent, PaginatorComponent, SeekerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = signal('Rick and Morty App');
  loading = true;
  characters?: Character[];
  previousPage?: string;
  nextPage?: string;

  constructor(private rickandmortyService: RickandmortyService, private themeService: ThemeService) { }

  ngOnInit() {
    this.getCharacters("");
  }

  isDarkMode(){
    return this.themeService.isDarkMode();
  }

  public getCharacters(page: string){
    this.loading = true;
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
        console.log('Info from API successfully obtained');
        this.loading = false;
      }
    });
  }

  reloadCharacters(newCharacters: Character[]) {
    this.characters = newCharacters;
  }

  reloadFoundCharacters(new_data: Info<Character[]>) {
    console.log("Recargo por búsqueda");
    console.log(new_data.info);
    (new_data.info?.prev);
    this.characters = new_data.results;
    this.previousPage = new_data.info?.prev ? new_data.info?.prev : "";
    this.nextPage = new_data.info?.next ? new_data.info?.next : "";
  }

}
