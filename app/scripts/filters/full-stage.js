'use strict';

/**
 * @ngdoc filter
 * @name fasterScaleApp.filter:fullStage
 * @function
 * @description
 * # fullStage
 * Filter in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .filter('fullStage', function () {
    return function (input) {
      return 'fullStage filter: ' + input;
    };
  });
