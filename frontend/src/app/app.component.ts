import { Component } from '@angular/core';

import { PoMenuItem } from '@portinari/portinari-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    { label: 'Tabelas', link: '/tables' },
    { label: 'Campos', link: '/fields' },
    { label: 'Indices', link: '/indexes' },
    { label: 'Parâmetros', link: '/params' },
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
