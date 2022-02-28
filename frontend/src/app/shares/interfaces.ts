export interface ConfigAlert {
  afficher : boolean ;
  type : string;
  message : string;
}

export interface RouePelleErrorMassage {
  success:boolean;
  numero:string;
  numPlaque:string;
  dateFab:string;
}

export interface ComposantErrorMassage {
  success:boolean;
  numCom:string;
  qte:string;
  rouePelle:string;
}

