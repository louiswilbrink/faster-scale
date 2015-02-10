'use strict';

/**
 * @ngdoc service
 * @name fasterScaleApp.authentication
 * @description
 * # authentication
 * Service in the fasterScaleApp.
 */
angular.module('fasterScaleApp')
  .service('Authentication', ['$rootScope', 
      'Constant', 
      '$log', 
      '$firebase', 
      '$firebaseAuth', 
      '$q', 
      '$location', 
      '$timeout', function Authentication($rootScope, 
      Constant, 
      $log, 
      $firebase,
      $firebaseAuth, 
      $q, 
      $location,
      $timeout) {

    var ref = new Firebase(Constant.baseUrl);
    var authObj = $firebaseAuth(ref);

    var isNascent = false;
    
    authObj.$onAuth(function(authData) {
        if (authData) {
            if (!isNascent) {  // If a user has just been created, hold off on broadcasting.
                $rootScope.$broadcast('loginSucceeded', authData.uid);
            }
        } else {
            if ($location.path() !== '/') {
                $location.path('/');
            }
        }
    });

    //var user = {};

    //var auth = new FirebaseSimpleLogin(ref, function(error, simpleLoginUser) {
      //if (error) {
        //// An error occurred while attempting login.

        //console.log(error);

        //$rootScope.$broadcast('loginFailed', error);
      //} 
      //else if (simpleLoginUser) {
        //// User authenticated with FirebaseSimpleLogin.
        //// Get user data from firebase.
        //// Also retrieve user key from simpleLogin table.

        //// If user $id is already defined, then this user was just created.
        //if (user.$id) {
        
            //$firebase(new Firebase(Constant.baseUrl + '/users/' + user.$id)).$asObject().$loaded().then(function (userData) {

            //user = userData;

            //$rootScope.$broadcast('newUserLoggedIn');

            //console.log('newUserLoggedIn', user.email, user.$id);
          //});
        //}
        //else {

          //$rootScope.$broadcast('loginSucceeded', simpleLoginUser);
        //}
      //} 
      //else {
        //// User has logged out.  
        //// Clear user data and return to login screen.

        //// App initializing and no user has logged in yet.
        //if (!user) { return; }

        //user = {};

        //$rootScope.$apply(function () {
          //$rootScope.$broadcast('userLoggedOut');
        //});
      //}
    //});

    return {

      ref: function () { return ref; },

      authObj: function () { return authObj; },

      //user: function () { return user; },

      logout: function () { 
          return authObj.$unauth();
      },

      login: function (credentials) {

        return authObj.$authWithPassword({
            email: credentials.email,
            password: credentials.password
        }).then(function (authData) {
            //console.log('logged in as:', authData.uid);
        }, function (error) {
            console.log('Authentication Error:', error);

            if (error.code && error.code === "INVALID_USER") {
                $rootScope.$broadcast('loginFailed');
            }
        });
      },
      
      //resetPassword: function (email) {

        //auth.sendPasswordResetEmail(email, function(error) {
          //if (!error) {
            //console.log('Password reset successfully:');
            //$rootScope.$broadcast('passwordReset');
          //}
          //else {
            //console.log(error);
            //$rootScope.$broadcast('resetPasswordError');
          //}
        //});
      //},

      //changePassword: function (oldPassword, newPassword) {
        //auth.changePassword(user.email, oldPassword, newPassword, function(error, success) {
          //if (!error) {
            //$log.log('Password changed successfully:', success);
            //$rootScope.$broadcast('passwordChanged');
          //}
        //});
      //},

      //removeUser: function (email, password) {

        //var _this = this;

        //auth.removeUser(email, password, function(error, success) {
          //if (!error) {
            //$log.log('User removed successfully:', success);
          //}
          //else {
            //$log.error(error);
          //}
        //})
        //.then(function () {

          //var userRef = new Firebase(Constant.baseUrl + '/users' + user.id);

          //userRef.update({ isActive : false });

          //_this.logout();
        //});
      //},

      createUser: function (email, password) {

          var uid, key;

          // Create a user.
          authObj.$createUser({
              email: email,
              password: password
          }).then(function(userData) { // log in.
             
              isNascent = true;

              return authObj.$authWithPassword({
                  email: email,
                  password: password
              });
          }).then(function(authData) { // Add a new user to users collection.
              // Save uid to add to simpleLogin map.
              uid = authData.uid;

              var users = $firebase(new Firebase(Constant.baseUrl + '/users')).$asArray();

              // Add user to database; include skeleton schema.
              return users.$add({
                  email: authData.password.email,
                  uid: authData.uid
              });
          }).then(function(userRef) { // Add the initial scale.

              key = userRef.key();

              var scales = $firebase(new Firebase(Constant.baseUrl + '/users/' + key + '/scales')).$asArray();

              return scales.$add({
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
              });
          }).then(function(userRef) { // add user key information to user.

              var user = $firebase(new Firebase(Constant.baseUrl + '/users/' + key));

              return user.$update({
                  key: key
              });
          }).then(function(userRef) { // save the uid and key to simpleLogin table for quick lookup.

              var simpleLoginRef = $firebase(new Firebase(Constant.baseUrl + '/simpleLogin'));

              var idHash = {};
              idHash[uid] = key;

              simpleLoginRef.$update(idHash);
          }).then(function() { // launch post-login processes with valid user data in firebase.
              isNascent = false;  // reset flag -- this user is now 'born'.
              $rootScope.$broadcast('loginSucceeded', uid);
          }).then(function() { // navigate to /home after all credentials are saved.
              $location.path('/home');
          }).catch(function(error) { // Catch any errors from these promises.
              console.error("Error: ", error);
              $rootScope.$broadcast('createUserError', error);
          });
      }
    };
  }]);
