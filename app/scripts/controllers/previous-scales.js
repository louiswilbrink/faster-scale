'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:PreviousScalesCtrl
 * @description
 * # PreviousScalesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('PreviousScalesCtrl', function ($scope, FasterScale) {

      $scope.previousScalesCtrl = {

          scales : FasterScale.getScales()

      };
  });
