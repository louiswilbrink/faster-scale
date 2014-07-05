'use strict';

describe('Controller: StagesCtrl', function () {

  // load the controller's module
  beforeEach(module('fasterScaleApp'));

  var StagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StagesCtrl = $controller('StagesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
