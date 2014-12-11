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

            commitment: null,

            fasterScaleDefinition: FasterScaleDefinition
        };

        /*
         * After getting stageId and behaviorsId objects, build a single
         * array that puts behaviors with their respective stages.
         */
        function setDisplayScale (stageIds, behaviorIds) {
            $scope.displayScaleCtrl.scale = [];

            if (stageIds) {
                angular.forEach(FasterScaleDefinition, function (stage) {
                    
                    if (stage.id in stageIds) {

                        $scope.displayScaleCtrl.scale.push({
                            stageId: stage.id,
                            behaviorIds: []
                        });

                        if (behaviorIds) {
                            angular.forEach(stage.behaviors, function (behavior) {
                                if (behavior.id in behaviorIds) {
                                    $scope.displayScaleCtrl.scale[$scope.displayScaleCtrl.scale.length - 1].behaviorIds.push(behavior.id);
                                }
                            });
                        }
                    }
                });
            }
        };

        $scope.$on('displayScaleLoaded', function () {

            var displayScale = User.getDisplayScale();

            var stageIds = displayScale.stages;
            var behaviorIds = displayScale.behaviors;

            setDisplayScale(stageIds, behaviorIds);
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

        $scope.$on('scaleLoaded', function () {
            $scope.displayScaleCtrl.commitment = FasterScale.getCommitment();
            console.log($scope.displayScaleCtrl.commitment);
        });
    }]);
