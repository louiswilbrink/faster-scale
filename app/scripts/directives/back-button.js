'use strict';

/**
 * @ngdoc directive
 * @name fasterScaleApp.directive:menuButton
 * @description
 * # menuButton
 */
angular.module('fasterScaleApp')
  .directive('backButton', function ($window) {
    return {
        templateUrl: 'views/back-button.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {

            scope.goBack = function () {
                $window.history.back();
            };
        }
    };
});
