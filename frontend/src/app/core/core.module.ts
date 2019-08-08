import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoI18nConfig, PoI18nModule } from '@portinari/portinari-ui';

import { generalPt } from './i18n/general-pt';
import { LiteralService } from './i18n/literal.service';

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
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoI18nModule.config(i18nConfig),
  ],
  providers: [
    LiteralService
  ],
})
export class CoreModule { }
