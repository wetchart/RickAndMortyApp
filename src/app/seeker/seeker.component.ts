import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../Models/character.model';
import { RickandmortyService } from '../Servicies/rickandmorty.service';
import {FormsModule} from '@angular/forms';
import { Info } from '../Models/common.model';

@Component({
  selector: 'seeker',
  imports: [FormsModule],
  templateUrl: './seeker.component.html',
  styleUrl: './seeker.component.sass'
})
export class SeekerComponent {
  @Output() foundCharactersEvent = new EventEmitter<Info<Character[]>>();
  query_name: string = "";
  loading = false;
  result?: Info<Character[]>;
  page = "https://rickandmortyapi.com/api/character/?name=";

  constructor(private rickandmortyService: RickandmortyService) { }

  search(){
    this.loading = true;
    this.page = this.page + this.query_name;
    this.rickandmortyService.getCharacters(this.page).subscribe({
      next: (data) => {
        this.result = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        this.foundCharactersEvent.emit(this.result);
      }
    });
  }
}
