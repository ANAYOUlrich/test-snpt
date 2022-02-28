import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Composant } from 'src/app/models/Composant';
import { RouePelle } from 'src/app/models/RouePelle';
import { ComposantService } from 'src/app/services/composant.service';
import { RouePelleService } from 'src/app/services/roue-pelle.service';
import { ConfigAlert } from 'src/app/shares/interfaces';

import { map } from 'rxjs/operators';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { ɵassignExtraOptionsToRouter } from '@angular/router';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  searchIdRoue: number = -1;
  searchError!: string;
  editComp !: Composant;
  listeComposants!: Composant[];
  listeRoues!: RouePelle[];

  constructor(
    private composantservice: ComposantService,
    private rouePelleService: RouePelleService
  ) {}

  ngOnInit(): void {
    this.getAllComposants();
    this.getAllRoues();
  }

  edit(composant : Composant){
    this.editComp = composant;
  }
  getAllRoues() {
    this.rouePelleService.all().subscribe((result) => {
      this.listeRoues = result;
    });
  }

  changeSearch() {
    if (this.searchIdRoue == -1) {
      this.getAllComposants();
    } else {
      this.getComposantOfRouePelle(this.searchIdRoue);
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

  getList(items: Composant[]) {
    return {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [
            {
              text: 'Numéro',
              bold :true,
              style: 'tableHeader',
            },
            {
              text: 'Quantité',
              style: 'tableHeader',
            },
            {
              text: 'Roue Pelle',
              style: 'tableHeader',
            },
          ],
          ...items.map(item => {
            return [item.numCom, item.qte, 'numero : '+ item.rouePelle.numero+ " | Plaque : "+item.rouePelle.numPlaque]
          })
        ],
      },
    };
  }

  getDocument() {
    return {
      content: [
        {
          text: 'Liste des composants des roues pelles',
          bold: true,
          fontSize: 20,
          // alignment: 'center',
          // margin: 20,
        },
        {
          text: '',
          bold: true,
          fontSize: 20,
          // alignment: 'center',
          margin: 10,
        },

        this.getList(this.listeComposants),

      ],
      styles: {
        Headers: {
          bold: true,
          fontSize: 18,
          // margin: [0, 0, 0, 20],
          // decoration: 'overline',
        },
        name: {
          fontsize: 16,
          bold: true,
        },
        total: {
          fontsize: 16,
          bold: true,
          italics: true,
        },
        ligne: {
          fontsize: 12,
          bold: true,
          italics: true,
        },
        sign: {
          // margin: [0, 50, 0, 10],
          // alignment: 'right',
          italics: true,
        },
        tableHeader: {
          fontsize: 12,
          bold: true,
          // alignment: 'center',
        },
      },
    };
  }

  generatePdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }
}
