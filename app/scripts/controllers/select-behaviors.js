'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:SelectBehaviorsCtrl
 * @description
 * # SelectBehaviorsCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('BehaviorsCtrl', ['$scope',
      'FasterScale',
      'FasterScaleDefinition',
      '$timeout', 
      '$routeParams',
      '$location', 
      '$mdToast',
      '$mdSidenav',
      'User', function ($scope, 
      FasterScale, 
      FasterScaleDefinition, 
      $timeout, 
      $routeParams, 
      $location, 
      $mdToast,
      $mdSidenav,
      User) {

    var getBehaviorDefinitions = function (stage) {

        var behaviorDefinitions;

        // Match the stage defined in the route to the full stage definition, then return the stage definition's full behavior list.
        angular.forEach(FasterScaleDefinition, function (stageDefinition) {
            if (stageDefinition.name.toLowerCase() === stage) {
                behaviorDefinitions = stageDefinition.behaviors;
                // Add save progress flag.
                angular.forEach(behaviorDefinitions, function (behaviorDefinition) {
                    behaviorDefinition.isSaving = false;
                });
            }
        });

        if (behaviorDefinitions) {
            return behaviorDefinitions;
        }
        else {
            $location.path('/home');
            throw 'Route does not specify a stage to look up (' + $scope.behaviorsCtrl.stage + ')';
        }
    };

    var saveAfterDelay = (function () {
        var DELAY = 1200;
        var timer;
                
        return function() {
            clearTimeout($timeout.cancel(timer));
            timer = $timeout(function() {
                FasterScale.saveBehaviorAnswers();
            }, DELAY)
        };
    })();

    // Run these FasterScale pulls in case they are already populated.
    $scope.behaviorsCtrl = {

      stage: $routeParams.stage,

      behaviorDefinitions: getBehaviorDefinitions($routeParams.stage),

      behaviors: FasterScale.getBehaviors(),

      answers: FasterScale.getBehaviorAnswers(),

      // Methods.

      toggleBehavior: function (id, index) {

        // Toggle save progress flag to show progress circular graphic.
        this.behaviorDefinitions[index].isSaving = !this.behaviorDefinitions[index].isSaving;

        FasterScale.toggleBehavior(id);
      },

      onInputBlur: saveAfterDelay,

      toggleMenu: function () {
          $mdSidenav('left').toggle();
      }
    };

    // Event-handlers.
    
    $scope.$on('behaviorAnswersSaved', function () {
        $mdToast.show($mdToast.simple()
            .content('Changes saved')
            .position('top right')
            .hideDelay(1200))
    });

    // Update when behavior has been toggled on the database.
    $scope.$on('BehaviorsUpdated', function () {
        
        // Turn all saving progress circles off.
        angular.forEach($scope.behaviorsCtrl.behaviorDefinitions, function (behaviorDefinition) {
            behaviorDefinition.isSaving = false;
        });
        
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
        $scope.behaviorsCtrl.answers = FasterScale.getBehaviorAnswers();
    });
}]);
