import { Component, OnInit } from '@angular/core';
import { RouePelle } from 'src/app/models/RouePelle';
import { RouePelleService } from 'src/app/services/roue-pelle.service';
import { ConfigAlert, RouePelleErrorMassage } from 'src/app/shares/interfaces';

@Component({
  selector: 'app-rouepelle-index',
  templateUrl: './index.component.html',
})
export class IndexRouePelleComponent implements OnInit {

  configAlert : ConfigAlert={
    afficher : false ,
    type : "",
    message : "string"
  };

  errors : RouePelleErrorMassage ={
    success:true,
    numero:"",
    numPlaque:"",
    dateFab:"",
  } ;
  creating:boolean = true;
  listeRoues!: RouePelle[];
  createEditRoue : RouePelle = new RouePelle();
  rouePelleSelectionner: RouePelle= new RouePelle();

  constructor(private rouePelleService: RouePelleService) {}

  ngOnInit(): void {
    this.getAllRoues();
  }

  resetErrors(){
    this.errors ={
      success:true,
      numero:"",
      numPlaque:"",
      dateFab:"",
    } ;
  }

  congurerAlert(afficher:boolean=false, message:string="", type:string=""){
        this.configAlert.afficher=afficher;
        this.configAlert.message=message
        this.configAlert.type=type
  }

  ajouterComposants(rouepelle : RouePelle){
    this.rouePelleSelectionner = rouepelle
  }

  storeOrUpdate(){
    if(this.creating==true){
       this.store()
    }else{
      this.update()
    }
  }

  create(){
    this.creating = true;
    this.resetErrors();
    this.congurerAlert();
    this.createEditRoue = new RouePelle();
  }

  store(){
    console.log('store begin')
    this.congurerAlert();
    this.errors = this.rouePelleService.validation(this.createEditRoue, this.listeRoues);
    if(this.errors.success==true){
    this.rouePelleService.store(this.createEditRoue).subscribe(
      result => {
        this.getAllRoues();
        if(result.error=="success"){
          this.createEditRoue = new RouePelle();
          this.congurerAlert(true,"Roue pelle enregistrer","success");
          this.resetErrors()
        }
        else this.congurerAlert(true,"Roue pelle non enregistrer","error");
        console.log('Ok');
      }
    )
    }
  }

  edit(item : RouePelle){
    this.creating = false;
    this.resetErrors();
    this.congurerAlert();
    this.createEditRoue=item;
  }

  update(){
    this.congurerAlert();
    console.log('update begin')
    this.errors = this.rouePelleService.validation(this.createEditRoue, this.listeRoues, true);

    if(this.errors.success==true){
      this.rouePelleService.store(this.createEditRoue).subscribe(
        result => {
          this.createEditRoue = new RouePelle();
          this.getAllRoues();
          if(result.error=="success") this.congurerAlert(true,"Roue pelle modifier","success");
          else this.congurerAlert(true,"Roue pelle non modifier","error");
          this.resetErrors()
          console.log('Ok');
        }
      )
    }
  }

  getAllRoues(){
    this.rouePelleService.all().subscribe(
      result=> {
        this.listeRoues = result;
      }
    )
  }

  delete(idRouePelle:number){
    if (confirm("La suppression de la roue pelle va entrainer la suppression de tous ses composants")) {
      this.congurerAlert();
    this.rouePelleService.delete(idRouePelle).subscribe(
      result =>{
        if(result==true){
          this.congurerAlert(true,"Roue Pelle supprimer","success");
        }else{
          this.congurerAlert(true,"Roue Pelle non supprimer","error");
        }
        this.getAllRoues();
      }
    )
    }

  }


}
