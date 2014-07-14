'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.authentication
 * @description
 * # authentication
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('Authentication', ['$rootScope', '$log', '$firebase', '$q', '$timeout', function Authentication($rootScope, $log, $firebase, $q, $timeout) {

    var baseUrl = 'https://fasterscale.firebaseio.com/',
        ref = new Firebase(baseUrl),
        user = {};

    var auth = new FirebaseSimpleLogin(ref, function(error, authenticatedUser) {
      if (error) {
        // An error occurred while attempting login.

        $log.error(error);
        $rootScope.$broadcast('loginFailed', error);
      } 
      else if (authenticatedUser) {
        // User authenticated with FirebaseSimpleLogin.
        // Get user data from firebase.
        // Also retrieve user key from simpleLogin table.

        // If user key is already defined, then this user was just created.
        if (user.key) {
        
          $firebase(new Firebase(baseUrl + '/users/' + user.key)).$on('loaded', function (userData) {

            user = userData;

            $log.log('loginSucceeded', user.email, user.key);
            $rootScope.$broadcast('loginSucceeded');
          });
        }
        else {

          // Retrieve user key from simpleLogin table.
          $firebase(new Firebase(baseUrl + '/simpleLogin/' + authenticatedUser.id)).$on('loaded', function (key) {

            $firebase(new Firebase(baseUrl + '/users/' + key)).$on('loaded', function (userData) {

              user = userData;
              user.key = key;

              $log.log('loginSucceeded', user.email, user.key);
              $rootScope.$broadcast('loginSucceeded');
            });
          });
        }
      } 
      else {
        // User has logged out.  
        // Clear user data and return to login screen.

        // App initializing and no user has logged in yet.
        if (!user) { return; }

        user = {};

        $rootScope.$apply(function () {
          $rootScope.$broadcast('userLoggedOut');
        });
      }
    });

    return {

      ref: function () { return ref; },

      user: function () { return user; },

      logout: function () { auth.logout(); },

      login: function (credentials) {

        auth.login('password', {
          email: credentials.email,
          password: credentials.password,
          rememberMe: credentials.rememberMe
        });
      },
      
      resetPassword: function (email) {
        auth.sendPasswordResetEmail(email, function(error, success) {
          if (!error) {
            $log.log('Password reset successfully:', success);
            $rootScope.$broadcast('passwordReset');
          }
        });
      },

      changePassword: function (oldPassword, newPassword) {
        auth.changePassword(user.email, oldPassword, newPassword, function(error, success) {
          if (!error) {
            $log.log('Password changed successfully:', success);
            $rootScope.$broadcast('passwordChanged');
          }
        });
      },

      removeUser: function (email, password) {

        var _this = this;

        auth.removeUser(email, password, function(error, success) {
          if (!error) {
            $log.log('User removed successfully:', success);
          }
          else {
            $log.error(error);
          }
        })
        .then(function () {

          var userRef = new Firebase(baseUrl + '/users' + user.id);

          userRef.update({ isActive : false });

          _this.logout();
        });
      },

      createUser: function (email, password) {

        var _this = this;

        auth.createUser(email, password, function(error, newUser) {
          if (!error) {

            var users = $firebase(new Firebase(baseUrl + '/users'));

            // Add user to database and log them in.
            users.$add({
              email: newUser.email,
              id: newUser.id,
              uid: newUser.uid,
              scales: [{
                startDate: Date.now(),
                endDate: Date.now(),
                isCurrent: true,
                minorBehaviors: ['minorBehaviorIds'],
                majorBehaviors: ['majorBehaviorIds']
              }]
            }).then(function (ref) {

              // Add simpleLoginUserId/firebaseUserKey to simpleLoginRef.
              var key = ref.name();

              var simpleLoginRef = $firebase(new Firebase(baseUrl + '/simpleLogin'));

              var simpleLoginLink = {};

              simpleLoginLink[newUser.id] = key;
              
              user.key = key;

              simpleLoginRef.$update(simpleLoginLink).then(function () {
                // Log in newly created user.
                _this.login({
                  email: email,
                  password: password,
                  rememberMe: false
                });
              });
            });

            $log.log('User created', newUser.email);
          }
          else {
            $log.error(error);
          }
        });
      }
    };
  }]);
