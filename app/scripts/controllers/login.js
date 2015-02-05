'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('LoginCtrl', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication) {

    console.log(Authentication);

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
            console.log('okay, heading home!');
            //$scope.navigateTo('/home');
        });
    };

    $scope.loginCtrl.onForgetPasswordClicked = function () {
        $location.path('/forget-password');
    };

    // Event Handlers

    $scope.$on('loginFailed', function () {
        $scope.$apply(function () {
            $scope.loginCtrl.status = 'uh oh.  That user doesn\'t seem to exist';
        });
    });
  }]);
