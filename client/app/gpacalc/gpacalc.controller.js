'use strict';

angular.module('yeoMeanApp')
  .controller('GpacalcCtrl', function ($scope, $http) {
        $scope.courseList = [];

        //Update the courseList to show the data already in the database
        $http.get('/api/courses').success(function(courseList) {
            $scope.courseList = courseList;
        });


        $scope.addCourse = function () {
            if ($scope.newCourse === '' || $scope.newGrade === '' || $scope.newCourseCredits ==='') {
                return;
            }
            $http.post('/api/courses', { name: $scope.newCourse, grade: $scope.newGrade, gradepoints : 4, credits: $scope.newCourseCredits}).success(function () {
                //Update movieList to have the same data that's in the database on the sever
                $http.get('/api/courses').success(function (courseList) {
                    $scope.courseList = courseList;
                });
                $scope.newCourse = '';
                $scope.newGrade = '';
                $scope.newCourseCredits = '';
            });
        };


    });
