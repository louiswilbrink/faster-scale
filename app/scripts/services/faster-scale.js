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
        baseUrl = 'fasterscale.firebaseio.com',
        selectedStage = 0,
        scales,
        stages,
        behaviors;

    // Methods.

    var logOnLoad = function (refName, ref) {

      ref.$loaded().then(function (snapshot) {
        console.log(refName, snapshot);
      });
    };

    var setBehaviorsAndStages = function (currentScaleId) {

      behaviors = $firebase(new Firebase(baseUrl + 
        '/users/' + Authentication.user().$id + 
        '/scales/' + currentScaleId + 
        '/behaviors')).$asObject();

      behaviors.$loaded();

      // When changes on the database occur, recalculate the stages after behaviors are synchronized.
      behaviors.$watch(calculateStage);

      logOnLoad('behaviors', behaviors);

      stages = $firebase(new Firebase(baseUrl + 
        '/users/' + Authentication.user().$id + 
        '/scales/' + currentScaleId + 
        '/stages')).$asObject();

      stages.$loaded();

      logOnLoad('stages', stages);

      $rootScope.$broadcast('stagesUpdated');
    };

    var getCurrentScaleId = function () {

      var currentScaleId;

      if (!scales) {
        console.log('no scales found.');
      }

      // Find the current scale.
      angular.forEach(scales, function (scale) {
        if (scale.isCurrent === true) {
          currentScaleId = scale.$id;
        }
      });

      // if for whatever reason there is no scale with an 'isCurrent' designation, set the last scale as the current scale and save it's $id.
      if (!currentScaleId) {
        scales[scales.length - 1].isCurrent = true;
        currentScaleId = scales[scales.length - 1].$id;
      }

      return currentScaleId;
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

      $rootScope.$broadcast('stagesUpdated');
    };

    // API

    return {

      init: function () {

        // Poll Authentication service until user is known.
        (function pollAuthenticationForUser () {
          $timeout(function () {

            if (Authentication.user().$id) {
              // Once user is defined in authentication service, save reference to the user's faster scales.
              scales = $firebase(new Firebase(baseUrl + 
                '/users/' + Authentication.user().$id + 
                '/scales/')).$asArray();

              scales.$loaded().then(function () {

                setBehaviorsAndStages(getCurrentScaleId());
              });
              
              logOnLoad('scales', scales);

              // End polling.
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

        selectedStage = index;
      }, 

      getSelectedStage: function () {

        return selectedStage;
      },

      toggleBehavior: function (id) {

        if (behaviors[id]) {
          delete behaviors[id];
          console.log('removing behavior', id);
        }
        else {
          behaviors[id] = { date: Date.now() };

          console.log('adding behavior', id);
        }

        behaviors.$save().then(calculateStage);

        $rootScope.$broadcast('BehaviorsUpdated');
      }, 

      addScale: function () {

        console.log('Adding scale');

        // Remove 'isCurrent' designation from all existing scales.
        angular.forEach(scales, function (scale, key) {
          scale.isCurrent = false;
          scales.$save(key);
        });

        scales.$add({
          startDate: Date.now(),
          endDate: Date.now(),
          // Add 'isCurrent' designation to new scale.
          isCurrent: true,
          behaviors: {
            'behaviorId': {
              date: Date.now()
            }
          },
          stages: {
            'stageId': {
              date: Date.now()
            }
          }
        }).then(function (newScaleRef) {
          setBehaviorsAndStages(newScaleRef.name());
        });
      },

      getBehaviors: function () {

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
