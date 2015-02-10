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
        'StageMap',
    function (
        $scope, 
        $routeParams,
        FasterScale, 
        User, 
        FasterScaleDefinition,
        StageMap) {

        $scope.displayScaleCtrl = {
          
            scale: null,

            scaleId: $routeParams.scaleId,

            commitment: null,

            behaviorAnswers: null,

            fasterScaleDefinition: FasterScaleDefinition
        };

        var setScale = function () {

            var displayScale = User.getDisplayScale();

            var stageIds = displayScale.stages;
            var behaviorIds = displayScale.behaviors;
            var behaviorAnswers = displayScale.behaviorAnswers;

            $scope.displayScaleCtrl.dateRange = {
                startDate: displayScale.startDate,
                endDate: displayScale.endDate
            };

            populateDisplayScale(stageIds, behaviorIds, behaviorAnswers);
        };

        // If this page has already been loaded, but navigated away and then returned, trigger the necessary events to populate the scale.
        if (User.getDisplayScale()) {
            console.log('back and forth');
            setScale();
        }

        /*
         * After getting stageId and behaviorsId objects, build a single
         * array that puts behaviors with their respective stages.
         */
        function populateDisplayScale (stageIds, behaviorIds, behaviorAnswers) {
            $scope.displayScaleCtrl.scale = [];

            if (stageIds) {
                angular.forEach(FasterScaleDefinition, function (stage) {
                    
                    if (stage.id in stageIds) {

                        $scope.displayScaleCtrl.scale.push({
                            stageId: stage.id,
                            minorBehaviorIds: [],
                            behaviorAnswers: null,
                            majorBehaviorId: null
                        });

                        var currentStageIndex = $scope.displayScaleCtrl.scale.length - 1;

                        if (behaviorIds) {
                            angular.forEach(stage.behaviors, function (behavior) {
                                if (behavior.id in behaviorIds) {
                                    if (behaviorIds[behavior.id].isCircled) {
                                        $scope.displayScaleCtrl.scale[currentStageIndex].majorBehaviorId = behavior.id;
                                    }

                                    if (behaviorIds[behavior.id].isUnderlined) {
                                        $scope.displayScaleCtrl.scale[currentStageIndex].minorBehaviorIds.push(behavior.id);
                                    }

                                    // Add behavior answers for this stage's major behavior.
                                    // This will only run once per stage.
                                    if (!$scope.displayScaleCtrl.scale[currentStageIndex].behaviorAnswers) {
                                        var fullStageName = StageMap[FasterScale.getPrefix(behavior.id)];
                                        $scope.displayScaleCtrl.scale[currentStageIndex].behaviorAnswers = behaviorAnswers[fullStageName];
                                    }
                                }
                            });
                        }
                    }
                });
            }
            console.log('scale:', $scope.displayScaleCtrl.scale);
        };

        $scope.$on('displayScaleLoaded', function () {

            console.log('$on.displayScaleLoaded');
            setScale();
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

        /*
         * Wait for the scale properties to be loaded, then populate.
         */
        $scope.$on('scaleLoaded', function () {
            $scope.displayScaleCtrl.commitment = FasterScale.getCommitment();
            $scope.displayScaleCtrl.behaviorAnswers = FasterScale.getBehaviorAnswers();
        });
    }]);
