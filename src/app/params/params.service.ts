import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericService } from '../generic/service/generic.service';
import { Param } from '../model/param.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService extends GenericService<Param> {

  constructor(http: HttpClient) {
    super(http)
  }

}
