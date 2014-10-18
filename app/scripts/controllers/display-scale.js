'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:DisplayScaleCtrl
 * @description
 * # DisplayScaleCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp').controller('DisplayScaleCtrl', ['$scope', 'FasterScale', 'User', function ($scope, FasterScale, User) {

    $scope.displayScaleCtrl = {
      
      scale: User.getDisplayScale()

    };

    console.log('displayScale:', $scope.displayScaleCtrl.scale);
}]);
