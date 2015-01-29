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
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAria',
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
        controller: 'MainCtrl'
      })
      .when('/home2', {
        templateUrl: 'views/home2.html',
        controller: 'MainCtrl'
      })
      .when('/previous-scales', {
        templateUrl: 'views/previous-scales.html',
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
      .when('/display-scale/:scaleId', {
        templateUrl: 'views/display-scale.html',
        controller: 'MainCtrl'
      })
      .when('/forgot-password', {
        templateUrl: 'views/forgot-password.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
