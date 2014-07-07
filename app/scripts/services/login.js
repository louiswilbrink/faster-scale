'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.login
 * @description
 * # login
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('Login', ['$rootScope', '$log', function Login($rootScope, $log) {

    var baseUrl = 'https://fasterscale.firebaseio.com/',
        ref = new Firebase(baseUrl),
        user;

    var auth = new FirebaseSimpleLogin(ref, function(error, authenticatedUser) {
      if (error) {
        // An error occurred while attempting login.

        $log.error(error);
        $rootScope.$broadcast('loginFailed', error);
      } 
      else if (authenticatedUser) {
        // User authenticated with Firebase.

        user = authenticatedUser;

        $log.info('User logged in:', user);
        $rootScope.$broadcast('loginSucceeded');
      } 
      else {
        // User has logged out.  
        // Clear user data and return to login screen.

        // App initializing and no user has logged in yet.
        if (!user) { return; }

        user = undefined;

        $rootScope.$apply(function () {
          $rootScope.$broadcast('userLoggedOut');
        });
      }
    });

    //auth.logout();

    return {

      ref: function () { return ref; },

      auth: function () { return auth; },

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
            $log.info('Password reset successfully:', success);
            $rootScope.$broadcast('passwordReset');
          }
        });
      },

      changePassword: function (oldPassword, newPassword) {
        auth.changePassword(user.email, oldPassword, newPassword, function(error, success) {
          if (!error) {
            $log.info('Password changed successfully:', success);
            $rootScope.$broadcast('passwordChanged');
          }
        });
      },

      removeUser: function (email, password) {

        var _this = this;

        auth.removeUser(email, password, function(error, success) {
          if (!error) {
            $log.info('User removed successfully:', success);
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

        auth.createUser(email, password, function(error, user) {
          if (!error) {

            var usersRef = new Firebase(baseUrl + '/users');

            // Create a new user object using the SimpleLogin id as the key.
            var newUser = {};

            newUser[user.id] = {
              email: user.email,
              isActive: true
            };
           
            // Use $update in order to set the correct key (user.id).
            // $add will just push the object with a random key.
            // We don't want that since we'd like the id between the firebase and SimpleLogin to match.
            usersRef.update(newUser);

            // Log in.
            _this.login({
              email: email,
              password: password,
              rememberMe: false
            });

            $log.info('User created:', user);
          }
          else {
            $log.error(error);
          }
        });
      }
    };
  }]);
