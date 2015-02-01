'use strict';

/**
 * @ngdoc directive
 * @name fasterScaleApp.directive:sideNav
 * @description
 * # sideNav
 */
angular.module('fasterScaleApp')
  .directive('fsSideNav', function ($mdSidenav) {
    return {
      templateUrl: 'views/fs-side-nav.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
          scope.menuItems = [{
              text: 'Current Scale',
              path: '/home',
              isSelected: true
          },
          {
              text: 'New Scale',
              path: 'www.google.com',
              isSelected: false
          },
          {
              text: 'Previous Scales',
              path: 'www.google.com',
              isSelected: false
          }];

          scope.close = function () {
                $mdSidenav('left').close();
          };
      }
    };
  });
