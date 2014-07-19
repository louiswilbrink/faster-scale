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

      behaviors: FasterScale.getBehaviors(),

      minorBehaviors: FasterScale.getMinorBehaviors(),
      
      // Methods.

      toggleBehavior: function (id) {
        
        FasterScale.toggleBehavior(id);
      }
    };

    // Event-handlers.
    
    $scope.$on('MinorBehaviorsUpdated', function () {
      $scope.behaviorsCtrl.minorBehaviors = FasterScale.getMinorBehaviors();
      console.log($scope.behaviorsCtrl.minorBehaviors);
    });
  });
