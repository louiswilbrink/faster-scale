'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.fasterScale
 * @description
 * # fasterScale
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('FasterScale', function FasterScale($rootScope, SCALE) {

    var fasterScale = SCALE,
        currentStage = 0,
        minorBehaviors = [],
        majorBehaviors = [];

    return {

      selectStage: function (index) {

        currentStage = index;
      }, 

      toggleBehavior: function (id) {

        if (minorBehaviors.indexOf(id) !== -1) {
          minorBehaviors.splice(minorBehaviors.indexOf(id), 1);
        }
        else {
          minorBehaviors.push(id);
        }

        $rootScope.$broadcast('MinorBehaviorsUpdated');
      }, 

      getBehaviors: function () {

        return fasterScale[currentStage].behaviors;
      },

      getMinorBehaviors: function () {

        return minorBehaviors;
      },

      getScale: function () {

        return fasterScale;
      }
    };
  });
