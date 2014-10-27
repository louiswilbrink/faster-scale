'use strict';

/**
 * @ngdoc filter
 * @name fasterScaleApp.filter:fullBehavior
 * @function
 * @description
 * # fullBehavior
 * Filter in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .filter('fullBehavior', function () {
    return function (input) {
      return 'fullBehavior filter: ' + input;
    };
  });
