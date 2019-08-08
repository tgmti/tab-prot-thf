import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PoBreadcrumb } from '@portinari/portinari-ui';

@Component({
  selector: 'app-dynamic-search-page',
  templateUrl: './dynamic-search-page.component.html',
  styleUrls: ['./dynamic-search-page.component.css']
})
export class DynamicSearchPageComponent implements OnInit {

  @Input('p-title') title?: string = 'Dynamic Search Page';

  private breadcrumb: PoBreadcrumb;

  constructor(private router: Router) {  }

  ngOnInit() {

    this.breadcrumb = {
      items: [
        { label: 'Home', action: () => this.router.navigate(['/']) },
        { label: this.title }
      ]
    };

  }

}
