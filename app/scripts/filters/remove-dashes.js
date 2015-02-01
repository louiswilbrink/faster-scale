'use strict';

/**
 * @ngdoc filter
 * @name fasterScaleApp.filter:removeDashes
 * @function
 * @description
 * # removeDashes
 * Filter in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .filter('removeDashes', function () {
    return function (input) {
      return input.replace(/-/g, " ");
    };
  });
