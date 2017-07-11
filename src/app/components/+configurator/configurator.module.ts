import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './configurator.routes';
import { ConfiguratorComponent } from './configurator.component';


@NgModule({
  declarations: [
    ConfiguratorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ConfiguratorModule {
  public static routes = routes;
}
