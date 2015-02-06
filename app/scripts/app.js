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
    'ngAria',
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/create-user', {
        templateUrl: 'views/create-user.html',
        controller: 'CreateUserCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
            authenticated : ['Authentication', function (Authentication) {
                return Authentication.authObj().$waitForAuth();
            }]
        }
      })
      .when('/previous-scales', {
        templateUrl: 'views/previous-scales.html',
        controller: 'PreviousScalesCtrl'
      })
      .when('/stage/:stage/behaviors', {
        templateUrl: 'views/select-behaviors.html',
        controller: 'BehaviorsCtrl'
      })
      .when('/display-scale/:scaleId', {
        templateUrl: 'views/display-scale.html',
        controller: 'DisplayScaleCtrl'
      })
      .when('/forgot-password', {
        templateUrl: 'views/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
