'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', ['$scope', 'FasterScale', 'User', '$mdSidenav', function ($scope, FasterScale, User, $mdSidenav) {

      $scope.homeCtrl = {

          addScale: User.addScale,

          viewPreviousScales: function () {

              console.log('viewPreviousScales');
          },
          toggleRight: function () {
              $mdSidenav('left').toggle();
          },
          close: function () {
              $mdSidenav('left').close();
          }
      };
  }]);
