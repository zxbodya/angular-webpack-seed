'use strict';

import angular from 'angular';
import 'angular-mocks';

let {module, inject} = angular.mock;

import demoModule from '../demoModule.js';

describe('demoWelcome directive', ()=> {
  let $compile,
    $rootScope;

  beforeEach(module(demoModule));


  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function () {
    var element = $compile("<div demo-welcome=''></div>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain("Hello, this is demo page");
  });
});
