'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('MainCtrl', function ($scope, $location) {

    $scope.navigateTo = function (path) {
      $location.path(path);
    };
  });
