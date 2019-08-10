import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PoBreadcrumb, PoTableColumn } from '@portinari/portinari-ui';

@Component({
  selector: 'app-dynamic-search-page',
  templateUrl: './dynamic-search-page.component.html',
  styleUrls: ['./dynamic-search-page.component.css']
})
export class DynamicSearchPageComponent implements OnInit {

  private title: string;
  public items: Array<PoTableColumn>;
  public columns: Array<PoTableColumn> = [];
  public breadcrumb: PoBreadcrumb;
  public isLoading: boolean;
  public hasNext: boolean;

  @Input('p-title') set setTitle(title) {
    this.title = title;
  }

  @Input('p-items') set setItems(items) {
    this.items = items;
  }

  @Input('p-columns') set setColumns(columns) {
    this.columns = columns;
  }

  @Input('p-loading') set setLoading(isLoading) {
    this.isLoading = isLoading;
  }

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
