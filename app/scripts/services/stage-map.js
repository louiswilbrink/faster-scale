'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.stageMap
 * @description
 * # stageMap
 * Constant in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
    .constant('StageMap', {
        'REST': 'restoration',
        'F': 'forgetting-priorities',
        'A': 'anxiety',
        'S': 'speeding-up',
        'T': 'ticked-off',
        'E': 'exhausted',
        'R': 'relapse'
    });
