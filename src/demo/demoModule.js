'use strict';

import angular from 'angular';
import welcomeDirective from './welcome/welcomeDirective';

angular
  .module('demo', [])
  .directive('demoWelcome', welcomeDirective);

module.exports = 'demo';
