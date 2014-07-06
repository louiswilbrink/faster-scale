'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('LoginCtrl', ['$scope', '$location', 'Login', function ($scope, $location, Login) {

    $scope.loginCtrl = {

      // Model.
      
      email: '',
      password: '',
      rememberMe: false,
      status: '',

      // Methods.
      
      signIn: function () {
        Login.login({
          email: this.email,
          password: this.password,
          rememberMe: false
        });
      },

      onForgetPasswordClicked: function () {
        $location.path('/forget-password');
      }
    };

    // Event Handlers

    $scope.$on('loginFailed', function () {
      $scope.$apply(function () {
        $scope.loginCtrl.status = 'uh oh.  That user doesn\'t seem to exist';
      });
    });
  }]);
