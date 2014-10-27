'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:DisplayScaleCtrl
 * @description
 * # DisplayScaleCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
    .controller('DisplayScaleCtrl', [
        '$scope', 
        '$routeParams',
        'FasterScale', 
        'User', 
        'FasterScaleDefinition', 
    function (
        $scope, 
        $routeParams,
        FasterScale, 
        User, 
        FasterScaleDefinition) {

        $scope.displayScaleCtrl = {
          
          scale: null,

          scaleId: $routeParams.scaleId,

          fasterScaleDefinition: FasterScaleDefinition
        };

        $scope.$on('displayScaleLoaded', function () {

            $scope.displayScaleCtrl.scale = User.getDisplayScale();
        });

        $scope.$on('userLoaded', function () {

            if (!$scope.displayScaleCtrl.scale && $scope.displayScaleCtrl.scaleId) {

                User.setDisplayScale($scope.displayScaleCtrl.scaleId);
            }
        });
    }]);
