import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly URL_API = environment.url_api;

    constructor(private http: HttpClient) { }

    get(endpoint: string, queryParams = {}): Observable<any> {
        const params = new HttpParams({
            fromObject: queryParams
          });
        return this.http.get(`${this.URL_API}${endpoint}`, { params });
    }
}
