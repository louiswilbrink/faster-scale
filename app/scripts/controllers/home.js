'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', function ($scope) {

    $scope.homeCtrl = {

      addScale: function () {

        console.log('Adding new scale');
      }
    };
  });
