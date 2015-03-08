'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp')
  .controller('HomeCtrl', ['$scope',
    '$timeout',
    'FasterScale',
    'User',
    '$location',
    '$mdSidenav',
    '$mdToast',
    '$animate', function ($scope, 
    $timeout, 
    FasterScale, 
    User, 
    $location, 
    $mdSidenav, 
    $mdToast, 
    $animate) {

    var saveAfterDelay = (function () {
        var DELAY = 1200;
        var timer;
                
        return function() {
            clearTimeout($timeout.cancel(timer));
            timer = $timeout(function() {
                FasterScale.saveCommitment();
                //console.log('saving..');
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

        isInputFocused: false,
       
        // Methods.
        
        onInputBlur: function () {
          saveAfterDelay();
          this.isInputFocused = false;
        },

        onInputFocus: function () {
            this.isInputFocused = true;
        },

        selectStage : function (stageName) {
            $location.path('/stage/' + stageName + '/behaviors');
        }
    };

    // Event-handlers.
    
    $scope.$on('commitmentSaved', function () {
        $mdToast.show($mdToast.simple()
            .content('Changes saved')
            .position('top right')
            .hideDelay(1200))
    });

    $scope.$on('homeUpdated', function () {
        $scope.homeCtrl.stages = FasterScale.getStagesRef();
    });

    $scope.$on('scaleLoaded', function () {
        $scope.homeCtrl.stageDefinitions = FasterScale.getDefinition();
        $scope.homeCtrl.stages = FasterScale.getStagesRef();
        $scope.homeCtrl.commitment = FasterScale.getCommitment();
    });
}]);

