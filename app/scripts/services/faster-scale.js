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
        stagesRef,
        behaviorsRef;

    // Methods.
    
    var logOnLoad = function (refName, ref) {

      ref.$on('loaded', function (snapshot) {
        console.log(refName, snapshot);
      });
    };

    var calculateStage = function () {

      var idPrefixes = ['REST', 'F', 'A', 'S', 'T', 'E', 'R', 'RMF'],
          indicies = behaviorsRef.$getIndex();

      // Get the prefix ids of all behaviors.
      indicies.forEach(function (value, key) {
        indicies[key] = value.slice(0, -3);
      });
      
      // Check for each idPrefix in behavior indicies.
      angular.forEach(idPrefixes, function (idPrefix) {

        if (indicies.indexOf(idPrefix) !== -1) {
          // Check if this idPrefix is found in the behaviors list.
          // If so, include its stage in stagesRef.
          
          stagesRef[idPrefix] = Date.now();
        }
        else if (stagesRef[idPrefix]) {
          // If idPrefix was not found in the behaviors list,
          // check to see if stagesRef contains the idPrefix and remove it.
          
          stagesRef.$remove(idPrefix);
        }
      });

      stagesRef.$save();
    };

    // API

    return {

      init: function () {

        // Poll Authentication service until user is known.
        (function pollAuthenticationForUser () {
          $timeout(function () {
            if (Authentication.user().key) {
              // Once user is defined in authentication service, save reference to the user's faster scales.
              scalesRef = $firebase(new Firebase(baseUrl + '/users/' + Authentication.user().key + '/scales/'));

              currentScaleRef = scalesRef.$child('0');

              behaviorsRef = currentScaleRef.$child('behaviors');

              stagesRef = currentScaleRef.$child('stages');

              // When behaviors are added or removed, recalculate stages.
              behaviorsRef.$on('change', calculateStage);

              logOnLoad('current scale', currentScaleRef);
              logOnLoad('scales', scalesRef);
              logOnLoad('behaviors', behaviorsRef);

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

        if (behaviorsRef[id]) {
          behaviorsRef.$remove(id);
          console.log('removing minorBehavior', id);
        }
        else {
          behaviorsRef[id] = {
            date: Date.now()
          };

          behaviorsRef.$save();

          console.log('adding minorBehavior', id);

        }

        $rootScope.$broadcast('MinorBehaviorsUpdated');
      }, 

      getBehaviors: function () {

        return fasterScale[currentStage].behaviors;
      },

      getBehaviorsRef: function () {

        return behaviorsRef;
      },

      getScale: function () {

        return fasterScale;
      }
    };
  });
