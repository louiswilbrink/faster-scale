'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('LandingCtrl', ['$scope', '$location', function ($scope, $location) {
    
      console.log('LandingCtrl');

      $scope.landingCtrl = {};

      $scope.landingCtrl.onSignUpClicked = function () {
          $location.path('/create-user');
      }

      $scope.onLoginClicked = function () {
          $location.path('/login');
      }
}]);
