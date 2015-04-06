'use strict';

angular.module('app', ['ng','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/:component',
        templateUrl: function ($stateParams) {
          // console.log('stateParams', $stateParams.component.length)
          // if ($stateParams.component.length) {

          // }
          return $stateParams.component.length > 0 ? 'components/'+ $stateParams.component +'/'+ $stateParams.component +'.html' : 'app/home.html';
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
