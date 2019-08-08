import { Injectable } from '@angular/core';

import { PoI18nService } from '@portinari/portinari-ui';

@Injectable({
  providedIn: 'root'
})
export class LiteralService {

  public literals = {};

  constructor(private poI18nService: PoI18nService) {
    this.poI18nService.getLiterals({ language: navigator.language })
      .subscribe(response => this.literals = response);
  }
}
