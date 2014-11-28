'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.user
 * @description
 * # user
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('User', ['$rootScope', '$firebase', 'Constant', 'Authentication', function User($rootScope, $firebase, Constant, Authentication) {

    var User,
        email, 
        id,
        scales,
        displayScale, 
        currentScaleId;

    function simpleLoginLookup (simpleLoginUser) {

        return {};
    }

    function setCurrentScaleId () {

        if (!scales) {
          console.log('no scales found.');
        }

        // Find the current scale.
        angular.forEach(scales, function (scale) {
            if (scale.isCurrent === true) {
              
                currentScaleId = scale.$id;

                $rootScope.$broadcast('currentScaleIdChanged', currentScaleId);
            }
        });

        // if for whatever reason there is no scale with an 'isCurrent' designation, set the last scale as the current scale and save it's $id.
        if (!currentScaleId) {

            scales[scales.length - 1].isCurrent = true;

            scales.$save(scales.length - 1);

            currentScaleId = scales[scales.length - 1].$id;

            $rootScope.$broadcast('currentScaleIdChanged', currentScaleId);
        }
    }

    function setDisplayScale (scaleId) {

        displayScale = $firebase(new Firebase(Constant.baseUrl
            + '/users/'
            + id 
            + '/scales/'
            + scaleId)).$asObject();
        
        displayScale.$loaded().then(function () {
            $rootScope.$broadcast('displayScaleLoaded');
        });
    }

    function loadUser (simpleLoginUser) {

        // Look up userId in simpleLogin lookup table.
        $firebase(new Firebase(Constant.baseUrl + '/simpleLogin/' + simpleLoginUser.id)).$asObject().$loaded().then(function (userKey) {

          $firebase(new Firebase(Constant.baseUrl + '/users/' + userKey.$value)).$asObject().$loaded().then(function (userData) {

            id = userData.$id;

            email = userData.email;

            scales = $firebase(new Firebase(Constant.baseUrl + '/users/' + id + '/scales')).$asArray();

            scales.$loaded().then(function () {
                setCurrentScaleId();
                $rootScope.$broadcast('scalesLoaded');
            });

            $rootScope.$broadcast('userLoaded');

            console.log('userLoaded', id, email, scales);
          });
        });

        return {};
    }

    function getScales() { return scales; }

    function getDisplayScale() { return displayScale; }

    function  addScale () {

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
          /*
           * Is this necessary??  
           * So far, so good, but leaving it in until further testing is done.
           *
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
          */
        }).then(function (ref) {
            $rootScope.$broadcast('scaleAdded', ref.name());
        });
    }

    function resetPassword () {
        return 'resetPassword()';
    }

    function changePassword () {
        return 'changePassword()';
    }

    function deleteUser () {
        return 'deleteUser()';
    }

    function getId () {
        return id;
    }

    $rootScope.$on('loginSucceeded', function (event, simpleLoginUser) {

        loadUser(simpleLoginUser);
    });

    User = {
        getId: getId,
        getScales: getScales,
        getDisplayScale: getDisplayScale,
        setDisplayScale: setDisplayScale,
        addScale: addScale,
        resetPassword: resetPassword,
        changePassword: changePassword,
        deleteUser: deleteUser
    };

    return User;

  }]);
