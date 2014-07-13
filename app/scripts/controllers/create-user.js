'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:CreateUserCtrl
 * @description
 * # CreateUserCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('CreateUserCtrl', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication) {

    $scope.createUserCtrl = {

      // Model.

      email: '',

      password: '',

      status: {
        text: 'Sign up with just an email and password',
      },

      // API.

      signUp: function () {

        var _this = this;

        // If email field not empty, create firebase user.
        if (!$scope.createUserCtrl.email) {
          _this.status.text = 'Please enter an email address';
          $scope.createUserCtrl.email = $scope.createUserCtrl.password = '';
        }
        else {
          Authentication.createUser($scope.createUserCtrl.email, $scope.createUserCtrl.password);
        }
      }
    };

    $scope.$on('CreateUserError', function (event, error) {

      $scope.$apply(function () {

        // TODO: Add 'EMAIL_TAKEN' to constant service.
        if (error.code === 'EMAIL_TAKEN') {

          $scope.createUserCtrl.status.text = 'The email is already taken';

          // Clear form for retry.
          $scope.createUserCtrl.email = '';
          $scope.createUserCtrl.password = '';
        }
        else {

          $scope.createUserCtrl.status.text = error.code;
        }
      });
    });
  }]);
