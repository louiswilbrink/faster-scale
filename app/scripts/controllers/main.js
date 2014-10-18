'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('MainCtrl', ['$scope', '$location', '$log', 'Authentication', '$timeout', 'User', function ($scope, $location, $log, Authentication, $timeout, User) {

    $scope.navigateTo = function (path) {

      $location.path(path);
    };

    $scope.logout = Authentication.logout;

    // Event handlers.
    $scope.$on('userLoggedOut', function () {

      // console.log('navigating to login page.');
      $location.path('/');
    });

    /*
     * Test user experience.
     *
    $scope.$on('loginSucceeded', function () {

      console.log('navigating to home page.');
      $location.path('/home');
    });
     *
     *
    */

    $scope.$on('newUserLoggedIn', function () {

      // console.log('navigating to home page.');
      $location.path('/home');
    });
  }]);
