'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:StagesCtrl
 * @description
 * # StagesCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('StagesCtrl', function ($scope, FasterScale) {

    $scope.stagesCtrl = {

      // Model.

      stages: FasterScale.getDefinition(),

      stagesRef: FasterScale.getStagesRef(),

      // Methods.
      
      selectStage : function (index) {
        FasterScale.selectStage(index);
      }
    };

    // Event-handlers.

    $scope.$on('stagesUpdated', function () {
      $scope.stagesCtrl.stagesRef = FasterScale.getStagesRef();
    });
  });
