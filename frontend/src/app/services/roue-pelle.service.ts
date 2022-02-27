import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { RouePelle } from '../models/RouePelle';
import { RouePelleErrorMassage } from '../shares/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RouePelleService {

  public url:string = 'http://localhost:8080/api/roue-pelle/';
  public errors : RouePelleErrorMassage={
    success:true,
    numero:"",
    numPlaque:"",
    dateFab:"",
  } ;

  constructor(private httpClient: HttpClient) {

  }

  public store (rouePelle: RouePelle): Observable<RouePelle> {
    const data = JSON.stringify(rouePelle);
    const urlSend = this.url + 'store';
    return this.httpClient.post<RouePelle>(urlSend, data, {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }

  public update (idRoupelle:number, rouePelle: RouePelle): Observable<RouePelle> {
    const data = JSON.stringify(rouePelle);
    const urlSend = this.url + 'update'+idRoupelle;
    return this.httpClient.post<RouePelle>(urlSend, data, {
      headers: new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }

  public all(): Observable<RouePelle[]>{
    const urlSend = this.url + 'all';
    return this.httpClient.get<RouePelle[]>(urlSend);
  }

  public delete(idRouePelle:number): Observable<boolean>{
    const urlSend = this.url + 'delete/'+idRouePelle;
    return this.httpClient.delete<boolean>(urlSend);
  }

  public validation(rouePelle : RouePelle, listeRoues: RouePelle[], edit:boolean = false) : RouePelleErrorMassage{
    this.errors ={
      success:true,
      numero:"",
      numPlaque:"",
      dateFab:"",
    } ;

      for (let index = 0; index < listeRoues.length; index++) {
        const element = listeRoues[index];
        if(edit==true){
          if (element.numPlaque==rouePelle.numPlaque && rouePelle.id!=element.id) {
            this.errors.numPlaque = " immatriculation est deja renseigner";
            this.errors.success= false;
          }

          if (element.numero==rouePelle.numero && rouePelle.id!=element.id) {
            this.errors.numero = "Cette numero est deja renseigner";
            this.errors.success= false;
          }
        }else{
          if (element.numPlaque==rouePelle.numPlaque) {
            this.errors.numPlaque = "Cette immatriculation est deja renseigner";
            this.errors.success= false;
          }

          if (element.numero==rouePelle.numero) {
            this.errors.numero = "Cette numero est deja renseigner";
            this.errors.success= false;
          }
        }
      }


  if(rouePelle.dateFab > new Date){
    this.errors.dateFab = "La date de fabrication doit etre posterieur à aujord'hui";
    this.errors.success= false;
  }

  if(rouePelle.numero==null){
    this.errors.numero = "Veuillez renseigner le numero";
    this.errors.success= false;
  }

  if(rouePelle.dateFab==null){
    this.errors.dateFab = "Veuillez renseigner la date de fabrication";
    this.errors.success= false;
  }

  if(rouePelle.numPlaque==null){
    this.errors.numPlaque = "Veuillez renseigner le numero de plaque";
    this.errors.success= false;
  }

  return this.errors;
}

}
