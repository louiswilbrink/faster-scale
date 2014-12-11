'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:StagesCtrl
 * @description
 * # StagesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('StagesCtrl', function ($scope, $timeout, FasterScale) {

    var saveAfterDelay = (function () {
        var DELAY = 500;
        var timer;
                
        return function() {
            console.log('clearing timer');
            clearTimeout($timeout.cancel(timer));
            timer = $timeout(function() {
                FasterScale.saveCommitment();
            }, DELAY)
        };
    })();

    $scope.stagesCtrl = {

      // Model.

      stages: FasterScale.getDefinition(),

      stagesRef: FasterScale.getStagesRef(),

      commitment: FasterScale.getCommitment(),
     
      // Methods.
      
      onProblemKeypress: saveAfterDelay,

      selectStage : function (index) {
        FasterScale.selectStage(index);
      }
    };

    // Event-handlers.

    $scope.$on('stagesUpdated', function () {
        $scope.stagesCtrl.stagesRef = FasterScale.getStagesRef();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.stagesCtrl.stages = FasterScale.getDefinition();
        $scope.stagesCtrl.stagesRef = FasterScale.getStagesRef();
        $scope.stagesCtrl.commitment = FasterScale.getCommitment();
    });
  });
