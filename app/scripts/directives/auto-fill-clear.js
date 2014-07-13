'use strict';

/**
 * @ngdoc directive
 * @name fasterScaleApp.directive:autoFillClear
 * @description
 * # autoFillClear
 */
angular.module('fasterScaleApp')
  .directive('autoFillClear', ['$timeout', function ($timeout) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        $timeout(function () {
            elem.val('');
            ngModel.$setViewValue('');
        }, 100);
      }
    };
  }]);
