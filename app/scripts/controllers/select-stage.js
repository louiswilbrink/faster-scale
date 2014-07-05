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
      stages: FasterScale.getScale(),     

      // Methods.
      selectStage : function (index) {
        FasterScale.selectStage(index);
      }
    };
  });
