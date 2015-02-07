'use strict';

/**
 * @ngdoc directive
 * @name fasterScaleApp.directive:sideNav
 * @description
 * # sideNav
 */
angular.module('fasterScaleApp')
  .directive('fsSideNav', function ($mdSidenav, $location, $timeout, User, Authentication) {
    return {
      templateUrl: 'views/fs-side-nav.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          scope.menuItems = [{
              text: 'Current Scale',
              onClick: function () {
                  // Go to home page where the user can interact with the current scale.
                  $location.path('/home');
                  
                  // Close the side-nav.
                  $mdSidenav('left').close();
              },
              isSelected: true
          },
          {
              text: 'New Scale',
              onClick: function () {
                $mdSidenav('left').close();
                User.addScale();
                $timeout(function () {
                    $location.path('/home');
                }, 700);
              },
              isSelected: false
          },
          {
              text: 'Previous Scales',
              onClick: function () {
                  $location.path('/previous-scales');
              },
              isSelected: false
          },
          {
              text: 'Logout',
              onClick: function () {
                  Authentication.logout();
              },
              isSelected: false
          },
          {
              text: 'Close',
              onClick: function () {
                  $mdSidenav('left').close();
              },
              isSelected: false
          }];
      }
    };
  });
