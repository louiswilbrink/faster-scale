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
        controller: 'LoginCtrl',
        resolve: {
            authenticated : ['Authentication', 'User', '$location', function (Authentication, User, $location) {
                return Authentication.authObj().$waitForAuth()
                    .then(function (authState) {
                        if (authState) {
                            console.log('authentication accepted:', authState.password.email);
                            $location.path('/home');
                        }
                        else {
                            console.log('authentication rejected');
                            $location.path('/');
                        }
                    });
            }]
        }
      })
      .when('/create-user', {
        templateUrl: 'views/create-user.html',
        controller: 'CreateUserCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
            authenticated : ['Authentication', 'User', '$location', function (Authentication, User, $location) {
                return Authentication.authObj().$waitForAuth()
                    .then(function (authState) {
                        if (authState) {
                            console.log('authentication accepted:', authState.password.email);
                        }
                        else {
                            console.log('authentication rejected');
                            // Go back to login screen.
                            $location.path('/');
                        }
                    });
            }]
        }
      })
      .when('/previous-scales', {
        templateUrl: 'views/previous-scales.html',
        controller: 'PreviousScalesCtrl',
        resolve: {
            authenticated : ['Authentication', 'User', '$location', function (Authentication, User, $location) {
                return Authentication.authObj().$waitForAuth()
                    .then(function (authState) {
                        if (authState) {
                            console.log('authentication accepted:', authState.password.email);
                        }
                        else {
                            console.log('authentication rejected');
                            $location.path('/');
                        }
                    });
            }]
        }
      })
      .when('/stage/:stage/behaviors', {
        templateUrl: 'views/select-behaviors.html',
        controller: 'BehaviorsCtrl',
        resolve: {
            authenticated : ['Authentication', 'User', '$location', function (Authentication, User, $location) {
                return Authentication.authObj().$waitForAuth()
                    .then(function (authState) {
                        if (authState) {
                            //console.log('/stage/:stage/behaviors - authentication accepted:', authState.password.email);
                        }
                        else {
                            console.log('authentication rejected');
                            // Go back to login screen.
                            $location.path('/');
                        }
                    });
            }]
        }
      })
      .when('/display-scale/:scaleId', {
        templateUrl: 'views/display-scale.html',
        controller: 'DisplayScaleCtrl',
        resolve: {
            authenticated : ['Authentication', 'User', '$location', function (Authentication, User, $location) {
                return Authentication.authObj().$waitForAuth()
                    .then(function (authState) {
                        if (authState) {
                            console.log('/display-scale/:scaleId - authentication accepted:', authState.password.email);
                        }
                        else {
                            console.log('authentication rejected');
                            // Go back to login screen.
                            $location.path('/');
                        }
                    });
            }]
        }
      })
      .when('/forgot-password', {
        templateUrl: 'views/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
