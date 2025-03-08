import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RickandmortyService } from '../Servicies/rickandmorty.service';
import { Character } from '../Models/character.model';

@Component({
  selector: 'paginator',
  imports: [MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.sass'
})
export class PaginatorComponent {
  @Input({required: true}) previousPage?: string;
  @Input({required: true}) nextPage?: string;
  @Output() newItemEvent = new EventEmitter<Character[]>();
  loading = true;
  characters?: Character[];

  constructor(private rickandmortyService: RickandmortyService) { }

  loadPreviousPage(){
    this.getCharacters(this.previousPage? this.previousPage : "");
  }

  loadNextPage(){
    this.getCharacters(this.nextPage? this.nextPage : "");
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
        this.loading = false;
        this.newItemEvent.emit(this.characters);
      }
    });
  }
}
