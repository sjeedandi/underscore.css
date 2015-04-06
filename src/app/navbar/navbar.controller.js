'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, underscoreCssComponents) {
    $scope.date = new Date();
    $scope.components = underscoreCssComponents;
  });
