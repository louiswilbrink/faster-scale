'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:SelectBehaviorsCtrl
 * @description
 * # SelectBehaviorsCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('BehaviorsCtrl', function ($scope, FasterScale, FasterScaleDefinition, $timeout, $routeParams, $location, User) {

    // Check if the user is signed in.  If not, navigate to login page.
    if (!User.getId()) {
        console.log('** you are not logged in **');
        $location.path('/');   // Back to login page.
    }

    var getBehaviorDefinitions = function (stage) {

        var behaviorDefinitions;

        // Match the stage defined in the route to the full stage definition, then return the stage definition's full behavior list.
        angular.forEach(FasterScaleDefinition, function (stageDefinition) {
            if (stageDefinition.name.toLowerCase() === stage) {
                behaviorDefinitions = stageDefinition.behaviors;
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
        var DELAY = 1500;
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

      toggleBehavior: function (id) {
        
        FasterScale.toggleBehavior(id);
      },

      onAnswerKeypress: saveAfterDelay,

    };

    // Event-handlers.
    
    // Update when behavior has been toggled on the database.
    $scope.$on('BehaviorsUpdated', function () {
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.behaviorsCtrl.behaviors = FasterScale.getBehaviors();
        $scope.behaviorsCtrl.answers = FasterScale.getBehaviorAnswers();
    });
});
