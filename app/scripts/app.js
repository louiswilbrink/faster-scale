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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
