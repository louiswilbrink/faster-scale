'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('MainCtrl', ['$scope', 
      '$location', 
      '$log', 
      'Authentication', 
      '$timeout', 
      'User',
      'authenticated', function ($scope, 
      $location, 
      $log, 
      Authentication, 
      $timeout, 
      User,
      authenticated) {

    console.log('authenticated:', authenticated);

    $scope.navigateTo = function (path) {

        $location.path(path);
    };

    $scope.buildPath = function (pathArray) {

        var path = '';

        angular.forEach(pathArray, function (value) {
            path += '/' + value;
        });

        return path;
    };

    $scope.logout = Authentication.logout;

    // Event handlers.
    $scope.$on('userLoggedOut', function () {

      // console.log('navigating to login page.');
      $location.path('/');
    });

    $scope.$on('newUserLoggedIn', function () {

      // console.log('navigating to home page.');
      $location.path('/home');
    });
}]);
