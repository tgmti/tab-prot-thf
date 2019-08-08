import { Injectable } from '@angular/core';

import { HttpService } from './core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor(private http: HttpService) { }

  getParams(): Observable<any> {
    return this.http.get('/params');
  }

}
