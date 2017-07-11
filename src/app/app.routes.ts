import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { NoContentComponent } from './components/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',
    component: HomeComponent },
  { path: 'home',
    component: HomeComponent },
  { path: 'about',
    component: AboutComponent },
  { path: 'detail',
    loadChildren: './components/+detail#DetailModule'},
  { path: 'barrel',
    loadChildren: './components/+barrel#BarrelModule'},
  { path: 'configurator',
    loadChildren: './components/+configurator#ConfiguratorModule'},
  { path: '**',
    component: NoContentComponent },
];
