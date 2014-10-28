'use strict';

/**
 * @ngdoc filter
 * @name fasterScaleApp.filter:fullBehavior
 * @function
 * @description
 * # fullBehavior
 * Filter in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
    .filter('fullBehavior', [
        'BehaviorMap',
    function (BehaviorMap) {

        return function (behaviorId) {
            return BehaviorMap[behaviorId];
        };
    }]);
