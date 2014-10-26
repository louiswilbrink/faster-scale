'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:PreviousScalesCtrl
 * @description
 * # PreviousScalesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('PreviousScalesCtrl', function ($scope, FasterScale, User) {

      $scope.previousScalesCtrl = {

          scales : User.getScales(),

          setDisplayScale: User.setDisplayScale
      };

      $scope.$on('scalesLoaded', function () {
          $scope.previousScalesCtrl.scales = User.getScales();
      });
  });
