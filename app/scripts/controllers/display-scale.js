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
          
            scale: [
                {
                    stageId: 'REST',
                    behaviorIds: ['R001', 'R002']
                },
                {
                    stageId: 'F',
                    behaviorIds: ['F003', 'F007']
                },
                {
                    stageId: 'A',
                    behaviorIds: ['A005', 'A015']
                }
            ],

            scaleId: $routeParams.scaleId,

            fasterScaleDefinition: FasterScaleDefinition
        };

        $scope.$on('displayScaleLoaded', function () {

            // $scope.displayScaleCtrl.scale = User.getDisplayScale();

            console.log($scope.displayScaleCtrl.scale);
        });

        /*
         * When this page is reloaded,
         * wait for re-authentication and user data to be loaded,
         * then set the display scale.
         */
        $scope.$on('userLoaded', function () {

            if (!$scope.displayScaleCtrl.scale && $scope.displayScaleCtrl.scaleId) {

                User.setDisplayScale($scope.displayScaleCtrl.scaleId);
            }
        });
    }]);
