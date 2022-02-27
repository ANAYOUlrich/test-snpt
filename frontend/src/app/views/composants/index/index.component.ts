import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Composant } from 'src/app/models/Composant';
import { RouePelle } from 'src/app/models/RouePelle';
import { ComposantService } from 'src/app/services/composant.service';
import { RouePelleService } from 'src/app/services/roue-pelle.service';
import { ConfigAlert } from 'src/app/shares/interfaces';

@Component({
  selector: 'app-composant-index',
  templateUrl: './index.component.html',
})
export class IndexComposantComponent implements OnInit {
  configAlert: ConfigAlert = {
    afficher: false,
    type: '',
    message: 'string',
  };

  searchIdRoue: number=-1;
  searchError!: string;

  listeComposants!: Composant[];
  listeRoues!: RouePelle[];

  constructor(private composantservice: ComposantService, private rouePelleService: RouePelleService) {}

  ngOnInit(): void {
    this.getAllComposants();
    this.getAllRoues();
  }

  getAllRoues(){
    this.rouePelleService.all().subscribe(
      result=> {
        this.listeRoues = result;
      }
    )
  }

  changeSearch(){
    if(this.searchIdRoue==-1){
      this.getAllComposants();
    }else{
      this.getComposantOfRouePelle(this.searchIdRoue)
    }
  }

  congurerAlert(
    afficher: boolean = false,
    message: string = '',
    type: string = ''
  ) {
    this.configAlert.afficher = afficher;
    this.configAlert.message = message;
    this.configAlert.type = type;
  }

  delete(idComposant: number) {
    if (confirm('Etes vous sur de vouloir supprimer ce composant')) {
      this.congurerAlert();
      this.composantservice.delete(idComposant).subscribe((result) => {
        if (result == true) {
          this.congurerAlert(true, 'Composant supprimer', 'success');
        } else {
          this.congurerAlert(true, 'Composant non supprimer', 'error');
        }
        this.getAllComposants();
      });
    }
  }

  getAllComposants() {
    this.composantservice.all().subscribe((result) => {
      this.listeComposants = result;
    });
  }

  getComposantOfRouePelle(idRouePelle: number) {
    this.composantservice
      .getComposantOfRouePelle(idRouePelle)
      .subscribe((result) => {
        this.listeComposants = result;
      });
  }
}
