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
          menuItems: [{
              text: 'Current Scale',
              href: 'www.google.com',
              isSelected: true
          },
          {
              text: 'New Scale',
              href: 'www.google.com',
              isSelected: false
          },
          {
              text: 'Previous Scales',
              href: 'www.google.com',
              isSelected: false
          }],
          toggleMenu: function () {
              $mdSidenav('left').toggle();
          },
          close: function () {
              $mdSidenav('left').close();
          }
      };
  }]);
