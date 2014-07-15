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
        scalesRef,
        currentScaleRef,
        baseUrl = 'fasterscale.firebaseio.com',
        currentStage = 0,
        minorBehaviorsRef,
        majorBehaviorsRef;

    return {

      init: function () {

        // Poll Authentication service until user is known.
        (function pollAuthenticationForUser () {
          $timeout(function () {
            if (Authentication.user().key) {
              // Once user is defined in authentication service, save reference to the user's faster scales.
              scalesRef = $firebase(new Firebase(baseUrl + '/users/' + Authentication.user().key + '/scales/'));

              scalesRef.$on('loaded', function (snapshot) {
                console.log('faster scales loaded:', snapshot);
              });

              currentScaleRef = scalesRef.$child('0');

              currentScaleRef.$on('loaded', function (snapshot) {
                console.log('current scale loaded:', snapshot);
              });

              minorBehaviorsRef = currentScaleRef.$child('minorBehaviors');

              minorBehaviorsRef.$on('loaded', function (snapshot) {
                console.log('minor behaviors loaded:', snapshot);
              });

              majorBehaviorsRef = currentScaleRef.$child('majorBehaviors');

              majorBehaviorsRef.$on('loaded', function (snapshot) {
                console.log('major behaviors loaded:', snapshot);
              });

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
