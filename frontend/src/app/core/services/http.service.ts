import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PoTableColumn } from '@po-ui/ng-components';

import { environment } from 'src/environments/environment';

import { LiteralService } from '../i18n/literal.service';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly URL_API = environment.url_api;

    protected endpoint: string;
    protected literalContext: string;
    protected columns: Array<PoTableColumn>;

    public literals: object;

    constructor(private http: HttpClient, private literalService: LiteralService) {
        this.literals = this.literalService.literals;
    }

    get(queryParams = {}): Observable<any> {
        const params = new HttpParams({
            fromObject: {...queryParams, fields: this.getColumns().map(f => f.property).join(',')}
          });
        return this.http.get(`${this.URL_API}${this.endpoint}`, { params });
    }

    getColumns(): Array<PoTableColumn> {
        return this.columns;
    }

}
