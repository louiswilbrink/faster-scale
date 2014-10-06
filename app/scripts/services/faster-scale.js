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
        selectedStage = 0,
        scales,
        stages,
        behaviors,
        
    
        // New stuff.
        scale,
        id,
        startDate,
        endDate;

    // Methods.
    
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

      stages.$save();

      $rootScope.$broadcast('stagesUpdated');
    };

    function loadScale (scaleId) {

        scale = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId)).$asObject();

        scale.$loaded().then(function () {
            console.log('scale loaded', scale);
        });
    }
  
    function loadStages (scaleId) {

        stages = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId + 
            '/stages')).$asObject();

        stages.$loaded().then(function () {
            console.log('stages loaded', stages);
        });
    }
    
    function loadBehaviors (scaleId) {

        behaviors = $firebase(new Firebase(Constant.baseUrl + 
            '/users/' + User.getId() + 
            '/scales/' + scaleId + 
            '/behaviors')).$asObject();

        behaviors.$loaded().then(function () {
            console.log('behaviors loaded', behaviors);
        });

        behaviors.$watch(calculateStage);
    }

    // Event handlers.
    
    $rootScope.$on('scaleAdded', function (event, scaleId) {
        loadScale(scaleId);
        loadStages(scaleId);
        loadBehaviors(scaleId);
    });

    $rootScope.$on('currentScaleIdChanged', function (event, scaleId) {
        loadScale(scaleId);
        loadStages(scaleId);
        loadBehaviors(scaleId);
    });

    // API

    return {

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

      getBehaviors: function () {

        return behaviors;
      },

      getScale: function (id) {

        return id;
      },

      getDefinition: function () {

        return FasterScaleDefinition;
      },

      getScales: function () {

        return scales;
      },

      getStagesRef: function () {

        return stages;
      },

    };
  }]);
