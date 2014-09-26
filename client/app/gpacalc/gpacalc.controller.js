'use strict';

angular.module('yeoMeanApp')
  .controller('GpacalcCtrl', function($scope, $http) {
        $scope.courseList = [];
        $scope.gpa = 0.00;

        //Update the courseList to show the data already in the database
        $http.get('/api/courses').success(function(courseList) {
            $scope.courseList = courseList;
            $scope.gpa = $scope.calculateGPA();
        });


        $scope.addCourse = function() {
            if ($scope.newCourse === '' || $scope.newGrade === '' || $scope.newCourseCredits === '') {
                console.log("doing nothing");
                return;
            }
            $http.post('/api/courses', { name: $scope.newCourse, grade: $scope.newGrade, gradepoints : $scope.getGradePoints($scope.newGrade), credits: $scope.newCourseCredits}).success(function () {
                //Update movieList to have the same data that's in the database on the sever
                $http.get('/api/courses').success(function (courseList) {
                    $scope.courseList = courseList;
                });
                $scope.newCourse = '';
                $scope.newCourseCredits = '';
                $scope.newGrade = '';

            });
            $scope.gpa = $scope.calculateGPA();
            console.log($scope.gpa);
        };

        $scope.getGradePoints = function(letterGrade) {
            switch (letterGrade) {
                case "A":
                    return 4;
                    break;
                case "A-":
                    return 3.7;
                    break;
                case "B+":
                    return 3.33;
                    break;
                case "B":
                    return 3;
                    break;
                case "B-":
                    return 2.7;
                    break;
                case "C+":
                    return 2.3;
                    break;
                case "C":
                    return 2;
                    break;
                case "C-":
                    return 1.7;
                    break;
                case "D+":
                    return 1.3;
                    break;
                case "D":
                    return 1;
                    break;
                case "D-":
                    return 0.7;
                    break;
                case "F":
                    return 0;
                    break;
                default:
                    return 0;
                    break;
            }

        };

        $scope.calculateGPA = function() {
            var gradePoints = 0;
            var credits = 0;
            var i;
            for (i=0; i<$scope.courseList.length; i++){
                gradePoints += $scope.getGradePoints($scope.courseList[i].grade) * $scope.courseList[i].credits;
                credits += $scope.courseList[i].credits;
                console.log(gradePoints);
            }
            return gradePoints / credits;
        }


    });
