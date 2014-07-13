'use strict';

/**
 * @ngdoc overview
 * @name fasterScaleApp
 * @description
 * # fasterScaleApp
 *
 * Main module of the application.
 */
angular
  .module('fasterScaleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .when('/create-user', {
        templateUrl: 'views/create-user.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        resolve: {
          waitForUserData: function ($timeout, Authentication) {

            // Allow firebase to log in the user and load their data.
            return $timeout(function () {
              if (!Authentication.user()) {
                console.log('Authentication not yet complete, loading page');
              }
              else {
                console.log('User date loaded', Authentication.user().email);
              }
            }, 1000);
          }
        }
      })
      .when('/select-stage', {
        templateUrl: 'views/select-stage.html',
        controller: 'MainCtrl'
      })
      .when('/select-behaviors', {
        templateUrl: 'views/select-behaviors.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
