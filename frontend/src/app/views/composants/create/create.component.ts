import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Composant } from 'src/app/models/Composant';
import { RouePelle } from 'src/app/models/RouePelle';
import { ComposantService } from 'src/app/services/composant.service';
import { RouePelleService } from 'src/app/services/roue-pelle.service';
import { ConfigAlert } from 'src/app/shares/interfaces';

@Component({
  selector: 'app-composant-create',
  templateUrl: './create.component.html',
})
export class CreateComposantComponent implements OnInit {
  configAlert: ConfigAlert = {
    afficher: false,
    type: '',
    message: 'string',
  };

  @Input('InputRouepelle') InputRouepelle!: RouePelle;
  @Input('cacherRouePelle') cacherRouePelle: Boolean = false;

  @Output('AfterComposantStore') AfterComposantStore:EventEmitter<boolean> = new EventEmitter<boolean>();

  searchIdRoue: number = -1;
  searchError!: string;

  listeRoues!: RouePelle[];
  createComposant: Composant = new Composant();

  constructor(
    private composantservice: ComposantService,
    private rouePelleService: RouePelleService
  ) {}

  ngOnInit(): void {
    this.getAllRoues();
    this.createComposant.rouePelle = this.InputRouepelle;
  }

  getAllRoues() {
    this.rouePelleService.all().subscribe((result) => {
      this.listeRoues = result;
    });
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

  store() {
    console.log('store begin');
    if (this.createComposant.rouePelle.id==null) {
      this.createComposant.rouePelle = this.InputRouepelle
    }
    this.congurerAlert();
    this.composantservice.store(this.createComposant).subscribe((result) => {
      if (result.error == 'success'){
        this.createComposant = new Composant();
        this.createComposant.rouePelle = new RouePelle();
        this.congurerAlert(true, 'Roue pelle enregistrer', 'success');
      }else this.congurerAlert(true, 'Roue pelle non enregistrer', 'error');
      this.AfterComposantStore.emit(true);
      console.log('Ok');
    });
  }
}
