import angular from 'angular';
import 'angular-mocks';

import demoModule from '../demoModule';
import WelcomeController from './WelcomeController';

const { module, inject } = angular.mock;

describe('WelcomeController', () => {
  beforeEach(module(demoModule));

  let $controller;

  beforeEach(inject((_$controller_) => {
    $controller = _$controller_;
  }));


  it('has items property, and it is non empty array', () => {
    const controller = $controller(WelcomeController, {});

    expect(controller.items).toBeTruthy();
    expect(controller.items.length).toBeGreaterThan(0);
  });
});
