import angular from 'angular';
import welcomeDirective from './welcome/welcomeDirective';

export default angular
  .module('demo', [])
  .directive('demoWelcome', welcomeDirective)
  .name;

