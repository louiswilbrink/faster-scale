'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.fasterScale
 * @description
 * # fasterScale
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('FasterScale', function FasterScale($rootScope, $timeout, $firebase, FasterScaleDefinition, Authentication) {

    var fasterScale = FasterScaleDefinition,
        currentScale,
        baseUrl = 'fasterscale.firebase.io',
        previousScales = [],
        currentStage = 0,
        minorBehaviors = [],
        majorBehaviors = [];

    return {

      init: function () {

        // Poll Authentication service until user is known.
        (function pollAuthenticationForUser () {
          $timeout(function () {
            if (Authentication.user().key) {
              // Save references to faster scales for this user.
              console.log('FasterScale initiated', Authentication.user());
              return;
            }
            else {
              // Continue polling.
              pollAuthenticationForUser();
            }
          }, 500);
        })();
      },

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
