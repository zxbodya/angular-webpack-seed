'use strict';

import 'angular/angular-csp.css';
import './index.css';

import angular from 'angular';

import demoModule from './demo/demoModule';

angular.module('main', [
  demoModule
]);

angular.bootstrap(document.documentElement, ['main']);

