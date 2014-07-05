'use strict';

describe('Service: SCALE', function () {

  // load the service's module
  beforeEach(module('fasterScaleApp'));

  // instantiate service
  var SCALE;
  beforeEach(inject(function (_SCALE_) {
    SCALE = _SCALE_;
  }));

  it('should do something', function () {
    expect(!!SCALE).toBe(true);
  });

});
