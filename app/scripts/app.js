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
          fasterScaleInit: function (FasterScale) {

            FasterScale.init();
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
