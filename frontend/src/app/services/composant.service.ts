import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Composant } from '../models/Composant';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {

  public url:string = 'http://localhost:8080/api/composant/';
  constructor(private httpClient: HttpClient) { }

  public store (composant: Composant): Observable<Composant> {
    const data = JSON.stringify(composant);
    const urlSend = this.url + 'store';
    return this.httpClient.post<Composant>(urlSend, data, {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }

  public all(): Observable<Composant[]>{
    const urlSend = this.url + 'all';
    return this.httpClient.get<Composant[]>(urlSend);
  }

  public getComposantOfRouePelle(idRouePelle : number) : Observable<Composant[]>{
    const urlSend = this.url + "roue-pelle/"+idRouePelle;
    return this.httpClient.get<Composant[]>(urlSend);
  }

  public delete(idComposant:Number): Observable<boolean>{
    const urlSend = this.url + 'delete/'+idComposant;
    return this.httpClient.delete<boolean>(urlSend);
  }
}
