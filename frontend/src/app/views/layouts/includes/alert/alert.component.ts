import { Component, Input, OnInit } from '@angular/core';
import { ConfigAlert } from 'src/app/shares/interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {

  constructor() { }
  @Input('ConfigAlert') configAlert!: ConfigAlert;

  ngOnInit(): void {
  }
}

