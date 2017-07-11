import { Component, OnInit } from '@angular/core';

import { AppState } from '../../services/app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'home',
  providers: [ Title ],
  styleUrls: [ './home.component.sass' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public localState = { value: '' };
  private data: any;

  constructor(
    public appState: AppState,
    public title: Title
  ) {}

  public ngOnInit() {
    this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
