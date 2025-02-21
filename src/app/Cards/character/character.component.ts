import { Component, Input, input } from '@angular/core';
import { Character } from '../../Models/character.model';

@Component({
  selector: 'character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.sass'
})
export class CharacterComponent {
  @Input({required: true}) character?: Character;

}
