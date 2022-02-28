import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Composant } from 'src/app/models/Composant';
import { RouePelle } from 'src/app/models/RouePelle';
import { ComposantService } from 'src/app/services/composant.service';
import { RouePelleService } from 'src/app/services/roue-pelle.service';
import { ComposantErrorMassage, ConfigAlert } from 'src/app/shares/interfaces';

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

  errors : ComposantErrorMassage ={
    success:true,
    numCom:"",
    qte:"",
    rouePelle:"",
  } ;

  @Input('InputRouepelle') InputRouepelle!: RouePelle;
  @Input('editComposant') editComposant!: Composant;
  @Input('cacherRouePelle') cacherRouePelle: Boolean = false;

  @Output('AfterComposantStore') AfterComposantStore:EventEmitter<boolean> = new EventEmitter<boolean>();

  searchIdRoue: number = -1;
  searchError!: string;

  listeRoues!: RouePelle[];
  createComposant: Composant = new Composant();

  listeComposants!: Composant[];

  constructor(
    private composantservice: ComposantService,
    private rouePelleService: RouePelleService
  ) {}

  ngOnInit(): void {
    this.getAllRoues();
    this.getAllComposants();
    this.createComposant.rouePelle = this.InputRouepelle;
  }

  getAllComposants() {
    this.composantservice.all().subscribe((result) => {
      this.listeComposants = result;
    });
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

  edit(){
    this.congurerAlert();
    this.resetErrors();
    this.createComposant = this.editComposant;
  }

  update() {
    console.log('update begin');
    this.congurerAlert();
    console.log(this.editComposant)
    this.errors = this.composantservice.validationEdit(this.editComposant);
    console.log(this.errors)
    if(this.errors.success==true){
    this.composantservice.store(this.editComposant).subscribe((result) => {
      if (result.error == 'success'){
        this.editComposant = new Composant();
        this.congurerAlert(true, 'Composant modifier', 'success');
      }else this.congurerAlert(true, 'Composant non modifier', 'error');
      this.AfterComposantStore.emit(true);
      this.resetErrors();
      console.log('Ok');
    });
  }}

  resetErrors(){
    this.errors ={
      success:true,
    numCom:"",
    qte:"",
    rouePelle:"",
    } ;
  }

  store() {
    console.log('store begin');
    if (this.cacherRouePelle==true) {
      this.createComposant.rouePelle = this.InputRouepelle
    }
    this.congurerAlert();

    this.errors = this.composantservice.validation(this.createComposant, this.listeComposants);
    if(this.errors.success==true){
    this.composantservice.store(this.createComposant).subscribe((result) => {
      if (result.error == 'success'){
        this.createComposant = new Composant();
        this.congurerAlert(true, 'Composant enregistrer', 'success');
      }else this.congurerAlert(true, 'Composant non enregistrer', 'error');
      this.AfterComposantStore.emit(true);
      this.resetErrors();
      console.log('Ok');
    });
  }}
}
