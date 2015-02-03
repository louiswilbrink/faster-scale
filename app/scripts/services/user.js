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

            //console.log('userLoaded', id, email, scales);
          });
        });

        return {};
    }

    function getScales() { return scales; }

    function getDisplayScale() { return displayScale; }

    function addScale () {

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
            // TODO: actually update the change date :(
            behaviors: {
                changeDate: Date.now()
            },
            // TODO: actually update the change date :(
            behaviorAnswers: {
                'restoration': { changeDate: Date.now() },
                'forgetting-priorities': { changeDate: Date.now() },
                'anxiety': { changeDate: Date.now() },
                'speeding-up': { changeDate: Date.now() },
                'ticked-off': { changeDate: Date.now() },
                'exhausted': { changeDate: Date.now() },
                'relapse': { changeDate: Date.now() },
            },
            commitment: {
                problem: '',
                choice: {
                    costToChange: '',
                    costToPreserve: ''
                },
                confrontation: {
                    faithfulChoice: '',
                    rightChoice: ''
                },
                plan: '',
                accountabilityPartners: ''
            }
        }).then(function (ref) {
            $rootScope.$broadcast('scaleAdded', ref.name());
        });
    }

    function deleteScale (scaleIndex) {
        scales.$remove(scaleIndex).then(function () {
            console.log('scale removed', scales);
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
        deleteScale: deleteScale,
        resetPassword: resetPassword,
        changePassword: changePassword,
        deleteUser: deleteUser
    };

    return User;

  }]);
