'use strict';

describe('Service: fasterScale', function () {

  // load the service's module
  beforeEach(module('fasterScaleApp'));

  // instantiate service
  var fasterScale;
  beforeEach(inject(function (_fasterScale_) {
    fasterScale = _fasterScale_;
  }));

  it('should do something', function () {
    expect(!!fasterScale).toBe(true);
  });

});
