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
    
    $scope.$on('BehaviorsUpdated', function () {
      $scope.behaviorsCtrl.behaviorsRef = FasterScale.getBehaviors();
    });
  });
