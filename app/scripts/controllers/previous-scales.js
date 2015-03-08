'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:PreviousScalesCtrl
 * @description
 * # PreviousScalesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('PreviousScalesCtrl', ['$scope',
      '$location',
      'FasterScale',
      'User',
      '$mdSidenav',
      function ($scope, 
      $location,
      FasterScale, 
      User,
      $mdSidenav) {

      $scope.previousScalesCtrl = {

          scales : User.getScales(),

          setDisplayScale: function (scaleId) {
              User.setDisplayScale(scaleId);
              $location.path('/display-scale/' + scaleId);
          },

          deleteScale: function (event, scaleIndex) { 
            event.stopPropagation();
            User.deleteScale(scaleIndex);
          },

          toggleMenu: function () {
              $mdSidenav('left').toggle();
          }
      };

      $scope.$on('scalesLoaded', function () {
          $scope.previousScalesCtrl.scales = User.getScales();
      });
  }]);
