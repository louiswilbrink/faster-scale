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
      'Authentication', 
      'authenticated', function ($scope, 
      $location, 
      Authentication, 
      authenticated) {

    $scope.loginCtrl = {

        // Model.
        
        email: '',
        password: '',
        rememberMe: false,
        status: ''
    };

    // Methods.
      
    $scope.loginCtrl.signIn = function ($event) {

        // ignore keypress events that are captured by ng-aria.  
        //     They will be captured by the ng-click directive 
        //     built into angular.  This avoids the function 
        //     firing twice.
        if ($event.type === 'keypress') { return; }

        Authentication.login({
            email: $scope.loginCtrl.email.toLowerCase(),
            password: $scope.loginCtrl.password.toLowerCase(),
            rememberMe: false
        }).then(function () {
            $location.path('/home');
        });
    };

    $scope.loginCtrl.onForgotPasswordClicked = function () {
        $location.path('/forget-password');
    };

    $scope.loginCtrl.onCreateUserClicked = function () {
        console.log('onCreateUserClicked()');
        $location.path('/create-user');
    };

    // Event Handlers

    $scope.$on('loginFailed', function () {
        console.log('$on.loginFailed');
        $scope.loginCtrl.status = 'uh oh.  That user doesn\'t seem to exist';
    });
}]);
