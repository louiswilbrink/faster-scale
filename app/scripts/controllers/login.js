'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('LoginCtrl', ['$scope', 
      '$location', 
      'Authentication', function ($scope, 
      $location, 
      Authentication) {

      $scope.loginCtrl = {

          // Model.
          
          email: '',
          password: '',
          rememberMe: false,
          status: ''
      };

      // Methods.
      
      $scope.loginCtrl.onInputFocus = function () {
          $scope.loginCtrl.status = '';
      };
        
      $scope.loginCtrl.signIn = function ($event) {

          // ignore keypress events that are captured by ng-aria.  
          //     They will be captured by the ng-click directive 
          //     built into angular.  This avoids the function 
          //     firing twice.
          if ($event.type === 'keypress') { return; }

          // Once this login routine is successful,  
          Authentication.login({
              email: $scope.loginCtrl.email.toLowerCase(),
              password: $scope.loginCtrl.password.toLowerCase(),
              rememberMe: false
          });
      };

      $scope.loginCtrl.onForgotPasswordClicked = function () {
          $location.path('/forget-password');
      };

      $scope.loginCtrl.onCreateUserClicked = function () {
          $location.path('/create-user');
      };

      // Event Handlers

      $scope.$on('loginFailed', function (event, code) {
          if (code === 'INVALID_USER') {
              $scope.loginCtrl.status = 'uh oh.  That user doesn\'t seem to exist';
          }
          if (code === 'INVALID_EMAIL') {
              $scope.loginCtrl.status = 'that isn\'t an email address';
          }
      });
}]);
