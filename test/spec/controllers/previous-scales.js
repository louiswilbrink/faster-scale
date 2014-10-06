'use strict';

describe('Controller: PreviousScalesCtrl', function () {

  // load the controller's module
  beforeEach(module('fasterScaleApp'));

  var PreviousScalesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreviousScalesCtrl = $controller('PreviousScalesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
