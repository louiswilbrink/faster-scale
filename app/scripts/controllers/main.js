'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('MainCtrl', ['$scope', '$location', '$log', 'Authentication', function ($scope, $location, $log, Authentication) {

    $scope.navigateTo = function (path) {

      $location.path(path);
    };

    $scope.logout = Authentication.logout;

    // Event handlers.
    $scope.$on('userLoggedOut', function () {

      $log.log('logging out.');
      $location.path('/');
    });

    $scope.$on('loginSucceeded', function () {

      $scope.$apply(function () {
        $log.log('logging in.');
        $location.path('/home');
      });
    });
  }]);
