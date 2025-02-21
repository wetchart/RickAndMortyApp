import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../Models/character.model';
import { Info } from '../Models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private readonly CHARACTER_PAGE_API = "https://rickandmortyapi.com/api/character";

  constructor(private http: HttpClient) { }

  // getCharacter(){
  //   return this.http.get<any>("https://rickandmortyapi.com/api/character");
  // }

  public getCharacters(url: string): Observable<Info<Character[]>> {
    if (url.length <= 0)
      return this.http.get<Info<Character[]>>(this.CHARACTER_PAGE_API);
    else
      return this.http.get<Info<Character[]>>(url);
  }
}
