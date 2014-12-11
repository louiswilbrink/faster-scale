'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:SelectBehaviorsCtrl
 * @description
 * # SelectBehaviorsCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('BehaviorsCtrl', function ($scope, FasterScale, FasterScaleDefinition) {

    $scope.behaviorsCtrl = {

      behaviorDefinitions: FasterScaleDefinition[FasterScale.getSelectedStage()].behaviors,

      behaviors: FasterScale.getBehaviors(),
      
      // Methods.

      toggleBehavior: function (id) {
        
        FasterScale.toggleBehavior(id);
      }
    };

    // Event-handlers.
    
    // Update when behavior has been toggled on the database.
    $scope.$on('BehaviorsUpdated', function () {
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
    });
  });
