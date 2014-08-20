'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', function ($scope, FasterScale) {

    $scope.homeCtrl = {

      addScale: FasterScale.addScale
    };
  });
