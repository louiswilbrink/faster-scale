'use strict';

/**
 * @ngdoc function
 * @name fasterScaleApp.controller:DisplayScaleCtrl
 * @description
 * # DisplayScaleCtrl
 * Controller of the fasterScaleApp
 */
angular.module('fasterScaleApp').controller('DisplayScaleCtrl', ['$scope', 'FasterScale', function ($scope, FasterScale) {

    $scope.scale = FasterScale.getDefinition();

    console.log($scope.scale);
}]);
