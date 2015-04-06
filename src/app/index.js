'use strict';

angular.module('sjeeUtilities', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/:component',
        templateUrl: function ($stateParams) {
          return 'app/'+ $stateParams.component +'/'+ $stateParams.component +'.html';
        },
        // controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .value('underscoreCssComponents', [
    'align',
    'position',
    'flex',
    'stage'
  ]);
