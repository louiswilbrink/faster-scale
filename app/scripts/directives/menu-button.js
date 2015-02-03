'use strict';

/**
 * @ngdoc directive
 * @name fasterScaleApp.directive:menuButton
 * @description
 * # menuButton
 */
angular.module('fasterScaleApp')
  .directive('menuButton', function ($mdSidenav) {
    return {
        templateUrl: 'views/menu-button.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {

            scope.toggleMenu = function () {
                $mdSidenav('left').toggle();
            };
        }
    };
});
