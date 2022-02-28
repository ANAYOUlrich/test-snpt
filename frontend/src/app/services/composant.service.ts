import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Composant } from '../models/Composant';
import { ComposantErrorMassage } from '../shares/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ComposantService {
  public url: string = 'http://localhost:8080/api/composant/';
  constructor(private httpClient: HttpClient) {}
  public errors: ComposantErrorMassage = {
    success: true,
    numCom: '',
    qte: '',
    rouePelle: '',
  };

  public store(composant: Composant): Observable<Composant> {
    const data = JSON.stringify(composant);
    const urlSend = this.url + 'store';
    return this.httpClient.post<Composant>(urlSend, data, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    });
  }

  public all(): Observable<Composant[]> {
    const urlSend = this.url + 'all';
    return this.httpClient.get<Composant[]>(urlSend);
  }

  public getComposantOfRouePelle(idRouePelle: number): Observable<Composant[]> {
    const urlSend = this.url + 'roue-pelle/' + idRouePelle;
    return this.httpClient.get<Composant[]>(urlSend);
  }

  public delete(idComposant: Number): Observable<boolean> {
    const urlSend = this.url + 'delete/' + idComposant;
    return this.httpClient.delete<boolean>(urlSend);
  }

  public validation(
    composant: Composant,
    listeComposants: Composant[]
  ): ComposantErrorMassage {
    this.errors = {
      success: true,
      numCom: '',
      qte: '',
      rouePelle: '',
    };

    for (let index = 0; index < listeComposants.length; index++) {
      const element = listeComposants[index];
      if (
        element.numCom == composant.numCom &&
        composant.rouePelle != null &&
        element.rouePelle.id == composant.rouePelle.id
      ) {
        this.errors.numCom = 'Ce composant existe déjà pour cette roue pelle';
        this.errors.success = false;
      }
    }

    if (composant.numCom == null) {
      this.errors.numCom = 'Veuillez renseigner le numero';
      this.errors.success = false;
    }

    if (composant.qte == null) {
      this.errors.qte = 'Veuillez renseigner la quantité';
      this.errors.success = false;
    }

    if (composant.rouePelle == null) {
      this.errors.rouePelle = 'Veuillez choisir une roue pelle';
      this.errors.success = false;
    }

    return this.errors;
  }

  public validationEdit(
    composant: Composant,
  ): ComposantErrorMassage {
    this.errors = {
      success: true,
      numCom: '',
      qte: '',
      rouePelle: '',
    };

    if (composant.numCom == null) {
      this.errors.numCom = 'Veuillez renseigner le numero';
      this.errors.success = false;
    }

    if (composant.qte == null) {
      this.errors.qte = 'Veuillez renseigner la quantité';
      this.errors.success = false;
    }

    if (composant.rouePelle == null) {
      this.errors.rouePelle = 'Veuillez choisir une roue pelle';
      this.errors.success = false;
    }

    return this.errors;
  }
}
