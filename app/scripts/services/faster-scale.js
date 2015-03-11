'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.fasterScale
 * @description
 * # fasterScale
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('FasterScale', ['$rootScope', '$timeout', '$firebase', 'FasterScaleDefinition', 'Authentication', 'User', 'Constant', function FasterScale($rootScope, $timeout, $firebase, FasterScaleDefinition, Authentication, User, Constant) {

    var fasterScale = FasterScaleDefinition,
        baseUrl = 'fasterscale.firebaseio.com',
        scales,
        stages,
        behaviors,
        behaviorAnswers,
        commitment,
        scale,
        id,
        startDate,
        endDate;

    // Methods.
    
    /*
    * Find the most recent date of all behaviors
    * and save it to the scale.endDate property
    */
    function revertScaleEndDate () {

        var latestDate = 0;

        // Find the latest date that a behavior was added..
        angular.forEach(behaviors, function (behavior, key) {
            if (behavior.date > latestDate) {
                latestDate = behavior.date;
            }
        });

        // ..then save it.
        scale.endDate = latestDate;
    };

    function calculateStage () {

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

      $rootScope.$broadcast('stagesUpdated');

      return stages.$save();
    };

    function loadScale (scaleId) {

        scale = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId)).$asObject();

        return scale.$loaded().then(function () {
            //console.log('scale loaded', scale);
        });
    }
  
    function loadStages (scaleId) {

        stages = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId + 
            '/stages')).$asObject();

        return stages.$loaded().then(function () {
            //console.log('stages loaded', stages);
        });
    }
    
    function loadBehaviors (scaleId) {

        behaviors = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId + 
            '/behaviors')).$asObject();

        return behaviors.$loaded().then(function () {
            //console.log('behaviors loaded', behaviors);
        });

        //behaviors.$watch(calculateStage);
    }

    function loadBehaviorAnswers (scaleId) {

        behaviorAnswers = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId + 
            '/behaviorAnswers')).$asObject();

        return behaviorAnswers.$loaded().then(function () {
            //console.log('behaviorAnswers loaded', behaviorAnswers);
        });
    }

    function loadCommitment (scaleId) {
        commitment = $firebase(new Firebase(Constant.baseUrl +
            '/users/' + User.getId() +
            '/scales/' + scaleId +
            '/commitment')).$asObject();

        return commitment.$loaded().then(function () {
            //console.log('commitment loaded', commitment);
        });
    }

    function getPrefix (behaviorId) {

        // Strip out id numerals.
        return behaviorId.replace(/[0-9]/g, '');
    }

    /**
     * Iterates through the list of behaviors and downgrades any "circled"
     *     behaviors to "underlined" that have the same stage.
     */
    function downgradeCircledBehaviors (id) {

        angular.forEach(behaviors, function (value, key) {
            if(value.isCircled && getPrefix(key) === getPrefix(id)) {
                value.isCircled = false;
                value.isUnderlined = true;
            }
        });
    }

    // Event handlers.
    
    $rootScope.$on('scaleAdded', function (event, scaleId) {

        id = scaleId;

        // TODO: get the promises working sanely.  Right now it's crazy nested.
        loadScale(scaleId)
           .then(loadStages(scaleId)
            .then(loadBehaviors(scaleId)
            .then(loadBehaviorAnswers(scaleId)
            .then(loadCommitment(scaleId)
            .then(function () {
                $rootScope.$broadcast('scaleLoaded');
            })))));
    });

    $rootScope.$on('currentScaleIdChanged', function (event, scaleId) {

        id = scaleId;

        // TODO: get the promises working sanely.  Right now it's crazy nested.
        loadScale(scaleId)
           .then(loadStages(scaleId)
            .then(loadBehaviors(scaleId)
            .then(loadBehaviorAnswers(scaleId)
            .then(loadCommitment(scaleId)
            .then(function () {
                $rootScope.$broadcast('scaleLoaded');
            })))));
    });

    // API

    return {

      /* NOTE: This is a three state toggle implementation.
       *       The three stages are underlined, circled, and off.
       */
      toggleBehavior: function (id) {

          console.log('id', id);

          // If the behavior is already part of the list, check if it's in the underlined or circled state.
          if (behaviors[id]) {

              // Check if this behavior has been "underlined" already (toggled once).
              // If so, upgrade it to "circled".
              if (behaviors[id].isUnderlined === true) {
                  // If any other behavior was previously "circled", downgrade it to "underlined"
                  downgradeCircledBehaviors(id);

                  behaviors[id].isUnderlined = false;
                  behaviors[id].isCircled = true;

                  // Extend this scale's end date.
                  scale.endDate = Date.now();

                  // Save the scale with it's new endDate.
                  // Then save the newly circled behavior
                  // and recalculate stages.
                  scale.$save()
                      .then(function () {
                          console.log('Save Scale: successful!');
                          console.log('circling behavior:', id);
                          behaviors.$save()
                              .then(function () {
                                  console.log('Save Behavior: successful!');
                                  $rootScope.$broadcast('BehaviorsUpdated');
                              }, function (error) {
                                  console.error('Error saving behaviors:', error);
                              });
                      }, function (error) {
                          console.error('Error saving scale:', error);  
                      })
                      .then(calculateStage);
              }
              // If this behavior has already been "circled", delete the behavior.
              else if (behaviors[id].isCircled === true) {
                  
                  // Toggle behavior OFF.
                  // Delete from behaviors and save.
                  delete behaviors[id];

                  // Extend this scale's end date.
                  scale.endDate = Date.now();

                  // Not sure this is a necessary feature.
                  //revertScaleEndDate();

                  // Save the scale with it's new endDate.
                  // Then save the removed behavior
                  // and recalculate stages.
                  scale.$save()
                      .then(function () {
                          console.log('Save Scale: successful!');
                          console.log('circling behavior:', id);
                          behaviors.$save()
                              .then(function () {
                                  console.log('Save Behavior: successful!');
                                  $rootScope.$broadcast('BehaviorsUpdated');
                              }, function (error) {
                                  console.error('Error saving behaviors:', error);
                              })
                      }, function (error) {
                          console.error('Error saving scale:', error);  
                      })
                      .then(calculateStage);
              }
          }
          else {
              // Toggle behavior ON.
              var now = Date.now();

              // Extend this scale's end date.
              scale.endDate = now;

              // First save the endDate change, then save the child nodes (behavior).
              // Saving at the same time can undo the intended behavior.
              scale.$save()
                  .then(function () {

                  // Add behavior to this scale.
                  behaviors[id] = { 
                    isUnderlined: true,
                    isCircled: false,
                    date: now 
                  };

                  behaviors.$save()
                      .then(function () {
                          calculateStage(),
                          console.log('underlined behavior');
                          console.log('Behaviors Saved Successfully!');
                          $rootScope.$broadcast('BehaviorsUpdated');
                      },
                      function (error) {
                          console.log('error saving behavior', error);
                      });
                  }, 
                  function (error) { 
                      console.log('error saving behavior endDate:', error); 
                  });
          }
      }, 

      behaviors: behaviors,

      getBehaviors: function () {

          return behaviors;
      },

      getScaleId: function () {

          return id;
      },

      getDefinition: function () {

          return FasterScaleDefinition;
      },

      getStagesRef: function () {

          return stages;
      },

      getCommitment: function () {
          return commitment;
      },

      saveCommitment: function () {

          // If app hasn't initialized yet, don't try saving.
          if (!commitment) { return; }
          commitment.$save().then(function () {
              //console.log('commitment saved to firebase', commitment);
              $rootScope.$broadcast('commitmentSaved');
          }, function (error) {
              console.log('error saving commitment to firebase', error);
          }).then(function () {
              scale.endDate = Date.now();
              scale.$save().then(function () {
                  //console.log('scale saved');
              }, function (error) {
                  console.log('error during scale save:', error);
              });
          });
      },

      saveBehaviorAnswers: function () {

          // If app hasn't initialized yet, don't try saving.
          if (!behaviorAnswers) { return; }

          behaviorAnswers.$save().then(function (ref) {
              //console.log('behaviorsAnswers saved to firebase', behaviorAnswers);
              $rootScope.$broadcast('behaviorAnswersSaved');
          }, function (error) {
              console.log('error saving behaviorsAnswers to firebase', error);
          }).then(function () {
              scale.endDate = Date.now();
              scale.$save().then(function () {
                  //console.log('scale saved');
              }, function (error) {
                  console.log('error during scale save:', error);
              });
          });
      },

      getBehaviorAnswers: function (stage) {

          if (stage) {
              return behaviorAnswers[stage];
          }
          return behaviorAnswers;
      },

      getPrefix: getPrefix
    };
  }]);
