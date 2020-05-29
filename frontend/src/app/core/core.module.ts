import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoI18nConfig, PoI18nModule } from '@po-ui/ng-components';

import { LiteralService } from './i18n/literal.service';
import { HttpService } from './services/http.service';

import { generalPt } from './i18n/general-pt';
import { tablesPt } from './i18n/tables-pt';
import { fieldsPt } from './i18n/fields-pt';
import { indexesPt } from './i18n/indexes-pt';
import { paramsPt } from './i18n/params-pt';

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt-BR',
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'pt-BR': generalPt
    },
    tables: {
      'pt-BR': tablesPt
    },
    fields: {
      'pt-BR': fieldsPt
    },
    indexes: {
      'pt-BR': indexesPt
    },
    params: {
      'pt-BR': paramsPt
      
    },
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoI18nModule.config(i18nConfig),
  ],
  providers: [
    LiteralService,
    HttpService,
  ],
})
export class CoreModule { }
