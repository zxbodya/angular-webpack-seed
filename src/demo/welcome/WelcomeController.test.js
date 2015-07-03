'use strict';

import angular from 'angular';
import 'angular-mocks';

let {module, inject} = angular.mock;

import demoModule from '../demoModule.js';
import WelcomeController from './WelcomeController';

describe('WelcomeController', ()=> {
  beforeEach(module(demoModule));

  let $controller;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));


  it('has items property, and it is non empty array', () => {
    const controller = $controller(WelcomeController, {});

    expect(controller.items).toBeTruthy();
    expect(controller.items.length).toBeGreaterThan(0);
  });
});
