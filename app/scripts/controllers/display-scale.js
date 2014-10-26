'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:DisplayScaleCtrl
 * @description
 * # DisplayScaleCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp').controller('DisplayScaleCtrl', ['$scope', 'FasterScale', 'User', 'FasterScaleDefinition', function ($scope, FasterScale, User, FasterScaleDefinition) {

    $scope.displayScaleCtrl = {
      
      scale: null,

      fasterScaleDefinition: FasterScaleDefinition
    };

    console.log($scope.displayScaleCtrl.fasterScaleDefinition);

    $scope.$on('displayScaleLoaded', function () {

        $scope.displayScaleCtrl.scale = User.getDisplayScale();
    });
}]);
