'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('MainCtrl', ['$scope', '$location', '$log', 'Authentication', '$timeout', function ($scope, $location, $log, Authentication, $timeout) {

    $scope.navigateTo = function (path) {

      $location.path(path);
    };

    $scope.logout = Authentication.logout;

    // Event handlers.
    $scope.$on('userLoggedOut', function () {

      console.log('navigating to login page.');
      $location.path('/');
    });

    $scope.$on('loginSucceeded', function () {

      $log.log('navigating to home page.');
      $location.path('/home');
    });
  }]);
