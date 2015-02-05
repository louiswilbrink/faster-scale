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

      createUser: function ($event) {

        // ignore keypress events that are captured by ng-aria.  
        //     They will be captured by the ng-click directive 
        //     built into angular.  This avoids the function 
        //     firing twice.
        if ($event.type === 'keypress') { return; }

        var _this = this;

        // If email field is empty, notify the user.
        if (!$scope.createUserCtrl.email) {
          _this.status.text = 'Please enter an email address';
          $scope.createUserCtrl.email = $scope.createUserCtrl.password = '';
        }
        // ..otherwise create the new user.
        else {
          Authentication.createUser($scope.createUserCtrl.email, $scope.createUserCtrl.password);
        }
      }
    };

    $scope.$on('createUserError', function (event, error) {

        console.log('$on.createUserError:', error);
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
}]);
