import angular from 'angular';
import 'angular-mocks';

import demoModule from '../demoModule';

const { module, inject } = angular.mock;

describe('demoWelcome directive', () => {
  let $compile;
  let $rootScope;

  beforeEach(module(demoModule));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', () => {
    const element = $compile('<div demo-welcome=""></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('Hello, this is demo page');
  });
});
