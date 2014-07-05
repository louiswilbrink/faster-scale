'use strict';

describe('Controller: SelectBehaviorsCtrl', function () {

  // load the controller's module
  beforeEach(module('fasterScaleApp'));

  var SelectBehaviorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectBehaviorsCtrl = $controller('SelectBehaviorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
