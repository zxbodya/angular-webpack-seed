import 'angular/angular-csp.css';
import './index.scss';

import angular from 'angular';

import demoModule from './demo/demoModule';

angular.module('main', [
  demoModule,
]);

angular.bootstrap(document.documentElement, ['main']);

