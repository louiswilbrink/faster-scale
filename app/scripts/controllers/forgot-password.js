'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('ForgotPasswordCtrl', ['$scope', 'Authentication', function ($scope, Authentication) {

    $scope.forgetCtrl = {

      // Model.

      email: '',

      // Methods.

      onSendResetEmailClicked: Authentication.resetPassword
    };
  }]);
