angular.module('ob')

.controller('SecondPageController', ['$scope', 'utils', function($scope, utils) {

    var parent = $scope.main;
    var _this = this;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 1){
            _this.init();
        }
    });

    this.init = function(){
        parent.displayButtons = true;
        parent.nextButton = 'Next';
        parent.nextDisabled = function(){
            return !_this.ageValid() || !_this.annualSalaryValid() || !_this.savedForRetirementValid();
        };
    };

    this.user = {};

    this.ageValid = function(){
        return utils.isInteger(this.user.age);
    };

    this.annualSalaryValid = function(){
        return !utils.isNull(this.user.annualSalary);
    };

    this.savedForRetirementValid = function(){
        return !utils.isNull(this.user.savedForRetirement);
    };

}]);