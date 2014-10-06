'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.constant
 * @description
 * # constant
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('Constant', ['FasterScaleDefinition', function Constant(FasterScaleDefinition) {

    var Constant;

    Constant = {
        baseUrl: 'fasterscale.firebaseio.com',
        isDebug: true,
        FasterScaleDefinition: FasterScaleDefinition
    };

    return Constant;
  }]);
