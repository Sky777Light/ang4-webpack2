import { Component, OnInit} from '@angular/core';
import { Configurator } from '../../configurator/configurator';

@Component({
  selector: 'configurator',
  styleUrls: [ './configurator.component.sass' ],
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent implements OnInit {

  public configurator: any;

  constructor( ){ }

  public ngOnInit() {
    this.configurator = new Configurator("configurator");
  }
}
