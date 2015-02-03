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
      '$firebaseAuth', 
      '$q', 
      '$timeout', function Authentication($rootScope, 
      Constant, 
      $log, 
      $firebaseAuth, 
      $q, 
      $timeout) {

    var ref = new Firebase(Constant.baseUrl);
    var authObj = $firebaseAuth(ref);
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

      //user: function () { return user; },

      //logout: function () { auth.logout(); },

      login: function (credentials) {

        return authObj.$authWithPassword({
            email: credentials.email,
            password: credentials.password
        }).then(function (authData) {
            console.log('logged in as:', authData.uid);
        }, function (error) {
            console.log('Authentication Error:', error);
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

      //createUser: function (email, password) {

        //var _this = this;

        //auth.createUser(email, password, function(error, newUser) {
          //if (!error) {

            //var users = $firebase(new Firebase(Constant.baseUrl + '/users')).$asArray();

            //// Add user to database and log them in.
            //users.$add({
              //email: newUser.email,
              //id: newUser.id,
              //uid: newUser.uid
            //}).then(function (ref) {

              //// Add simpleLoginUserId/firebaseUserKey to simpleLoginRef.
              //var id = ref.name();

              //// Load simpleLogin table.  Add the new simpleLoginId and userId link.
              //var simpleLogin = $firebase(new Firebase(Constant.baseUrl + '/simpleLogin')).$asObject();
              //simpleLogin.$loaded().then(function () {

                //// Add the new simpleLoginId and userId link.
                //simpleLogin[newUser.id] = ref.name();
                
                //// Save, then log in.
                //simpleLogin.$save().then(function () {
                  //// Log in newly created user.
                  //_this.login({
                    //email: email,
                    //password: password,
                    //rememberMe: false
                  //});
                //});
              //});

              //// Save this key in the user object.
              //user.$id = id;

              //// Add first scale.
              //var scales = $firebase(new Firebase(Constant.baseUrl + '/users/' + user.$id + '/scales')).$asArray();

              //scales.$loaded().then(function () {
              
                //scales.$add({
                  //startDate: Date.now(),
                  //endDate: Date.now(),
                  //isCurrent: true,
                  //behaviors: {
                    //'behaviorId': {
                      //date: Date.now()
                    //}
                  //},
                  //stages: {
                    //'stageId': {
                      //date: Date.now()
                    //}
                  //}
                //});
              //});
            //});

            //console.log('New user created', newUser.email);
          //}
          //else {
            //console.error(error);
          //}
        //});
      //}
    };
  }]);
