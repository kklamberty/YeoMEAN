'use strict';

angular.module('yeoMeanApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
        'title': 'UMM',
        'link': '/umm'
    },
    {
        'title': 'GPA',
        'link': '/gpacalc'}
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });