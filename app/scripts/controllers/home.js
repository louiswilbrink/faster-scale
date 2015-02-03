'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', function ($scope, $timeout, FasterScale, User, $location, $mdSidenav) {

    // Check if the user is signed in.  If not, navigate to login page.
    if (!User.getId()) {
        console.log('** you are not logged in **');
        $location.path('/');   // Back to login page.
    }

    var saveAfterDelay = (function () {
        var DELAY = 1500;
        var timer;
                
        return function() {
            clearTimeout($timeout.cancel(timer));
            timer = $timeout(function() {
                FasterScale.saveCommitment();
                console.log('saving..');
            }, DELAY)
        };
    })();

    $scope.homeCtrl = {

        addScale: User.addScale,

        viewPreviousScales: function () {

            console.log('viewPreviousScales');
        },
        toggleMenu: function () {
            $mdSidenav('left').toggle();
        },

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

    $scope.$on('homeUpdated', function () {
        $scope.homeCtrl.stages = FasterScale.getStagesRef();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.homeCtrl.stageDefinitions = FasterScale.getDefinition();
        $scope.homeCtrl.stages = FasterScale.getStagesRef();
        $scope.homeCtrl.commitment = FasterScale.getCommitment();
    });
});

