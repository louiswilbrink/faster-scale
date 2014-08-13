'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:SelectBehaviorsCtrl
 * @description
 * # SelectBehaviorsCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('BehaviorsCtrl', function ($scope, FasterScale) {

    $scope.behaviorsCtrl = {

      behaviorDefinitions: FasterScale.getFullBehaviorList(),

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
