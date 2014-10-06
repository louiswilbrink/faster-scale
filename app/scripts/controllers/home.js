'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', ['$scope', 'FasterScale', 'User', function ($scope, FasterScale, User) {

      $scope.homeCtrl = {

          addScale: User.addScale,

          viewPreviousScales: function () {

              console.log('viewPreviousScales');
          }
      };
  }]);
