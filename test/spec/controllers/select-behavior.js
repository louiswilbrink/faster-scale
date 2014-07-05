'use strict';

describe('Controller: SelectBehaviorCtrl', function () {

  // load the controller's module
  beforeEach(module('fasterScaleApp'));

  var SelectBehaviorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectBehaviorCtrl = $controller('SelectBehaviorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
