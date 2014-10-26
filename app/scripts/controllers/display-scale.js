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

        console.log($scope.displayScaleCtrl.scaleId);

        $scope.$on('displayScaleLoaded', function () {

            $scope.displayScaleCtrl.scale = User.getDisplayScale();
        });
    }]);
