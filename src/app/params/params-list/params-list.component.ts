import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification';

import { ParamsService } from './../params.service';
import { GenericListComponent } from 'src/app/shared/components/generic-list/generic-list.component';
import { Param } from 'src/app/model/param.interface';


@Component({
  selector: 'app-params-list',
  templateUrl: './params-list.component.html',
  styleUrls: ['./params-list.component.css']
})
export class ParamsListComponent extends GenericListComponent {

  title = 'Params';
  items: Array<Param>;
  
  /** bind do componente modal para pesquisa avançada */
  //@ViewChild('dynamicSearch') dynamicSearch: GenericListComponent;

  constructor(
    dataService: ParamsService,
    thfNotification: ThfNotificationService,
    thfDialog: ThfDialogService,
    router: Router
  ) {
    super(dataService, thfNotification, thfDialog, router);
  }

}
