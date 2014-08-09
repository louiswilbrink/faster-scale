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
        currentScaleRef,
        baseUrl = 'fasterscale.firebaseio.com',
        currentStage = 0,
        scales,
        stages,
        behaviors;

    // Methods.
    
    var logOnLoad = function (refName, ref) {

      ref.$loaded().then(function (snapshot) {
        console.log(refName, snapshot);
      });
    };

    // Examines all behaviors and identifies all parent stages.
    // Stages saved to stages.
    var calculateStage = function () {

      var idPrefixes = ['REST', 'F', 'A', 'S', 'T', 'E', 'R'],
          indicies = [];

      // Get all property names of behaviors object that isn't a firebase property ('$') or placeholder ('b').
      angular.forEach(behaviors, function (value, key) {
        if (key.substring(0,1) !== '$' && key.substring(0,1) !== 'b') {
          indicies.push(key);
        }
      });

      // Get the prefix ids of all behaviors.
      indicies.forEach(function (value, key) {
        indicies[key] = value.slice(0, -3);
      });

      console.log(indicies);
      
      // Check for each idPrefix in behavior indicies.
      angular.forEach(idPrefixes, function (idPrefix) {

        if (indicies.indexOf(idPrefix) !== -1) {
          // idPrefix found in the behaviors list.
          // Include its stage in stages.
          
          stages[idPrefix] = { date: Date.now() };
        }
        else if (stages[idPrefix]) {
          // idPrefix not found in the behaviors list.  Remove it.
          
          delete stages[idPrefix];
        }
      });

      stages.$save();

      $rootScope.$broadcast('stagesRefUpdated');
    };

    // API

    return {

      init: function () {

        // Poll Authentication service until user is known.
        (function pollAuthenticationForUser () {
          $timeout(function () {
            if (Authentication.user().key) {
              // Once user is defined in authentication service, save reference to the user's faster scales.
              scales = $firebase(new Firebase(baseUrl + '/users/' + Authentication.user().key + '/scales/')).$asObject();
              scales.$loaded();
              
              //behaviorsRef = currentScaleRef.$child('behaviors');
              behaviors = $firebase(new Firebase(baseUrl + '/users/' + Authentication.user().key + '/scales/0/behaviors')).$asObject();
              behaviors.$loaded();

              //stagesRef = currentScaleRef.$child('stages');
              stages = $firebase(new Firebase(baseUrl + '/users/' + Authentication.user().key + '/scales/0/stages')).$asObject();
              stages.$loaded();

              behaviors.$watch(calculateStage);

              logOnLoad('scales', scales);
              logOnLoad('behaviors', behaviors);

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

        if (behaviors[id]) {
          delete behaviors[id];
          console.log('removing minorBehavior', id);
        }
        else {
          behaviors[id] = { date: Date.now() };

          console.log('adding minorBehavior', id);
        }

        behaviors.$save();

        $rootScope.$broadcast('MinorBehaviorsUpdated');
      }, 

      getBehaviors: function () {

        return fasterScale[currentStage].behaviors;
      },

      getBehaviorsRef: function () {

        return behaviors;
      },

      getScale: function () {

        return fasterScale;
      },

      getStagesRef: function () {

        return stages;
      },

    };
  });
