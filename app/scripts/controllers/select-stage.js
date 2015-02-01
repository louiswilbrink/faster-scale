'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:StagesCtrl
 * @description
 * # StagesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('StagesCtrl', function ($scope, $timeout, FasterScale, $location) {

    var saveAfterDelay = (function () {
        var DELAY = 500;
        var timer;
                
        return function() {
            clearTimeout($timeout.cancel(timer));
            timer = $timeout(function() {
                FasterScale.saveCommitment();
            }, DELAY)
        };
    })();

    $scope.stagesCtrl = {

        // Model.

        stageDefinitions: FasterScale.getDefinition(),

        stages: FasterScale.getStagesRef(),

        commitment: FasterScale.getCommitment(),
       
        // Methods.
        
        onCommitmentKeypress: saveAfterDelay,

        selectStage : function (stageName) {
            $location.path('/stage/' + stageName + '/behaviors');
        }
    };


    // Event-handlers.

    $scope.$on('stagesUpdated', function () {
        $scope.stagesCtrl.stages = FasterScale.getStagesRef();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.stagesCtrl.stageDefinitions = FasterScale.getDefinition();
        $scope.stagesCtrl.stages = FasterScale.getStagesRef();
        $scope.stagesCtrl.commitment = FasterScale.getCommitment();
    });
  });
