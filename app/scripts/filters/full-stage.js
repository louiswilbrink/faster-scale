'use strict';

/**
 * @ngdoc filter
 * @name fasterScaleApp.filter:fullStage
 * @function
 * @description
 * # fullStage
 * Filter in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
    .filter('fullStage', [
        'StageMap', 
    function (StageMap) {

        return function (stageId) {
            return StageMap[stageId];
        };
    }]);
