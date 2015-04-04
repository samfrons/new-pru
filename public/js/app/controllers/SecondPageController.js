angular.module('ob')

.controller('SecondPageController', ['$scope', 'utils', 'retirement', function($scope, utils, retirement) {

    var parent = $scope.main;
    var _this = this;

    this.user = {};
    this.focus = false;
    $scope.$watch('main.currentIndex', function(index){
        if(index === 1){
            _this.init();
        }
        if(index === 2){
            retirement.age = parseInt(_this.user.age,10);
            retirement.salary = parseInt(_this.user.annualSalary.replace(',','').trim(),10);
            retirement.savedForRetirement = parseInt(_this.user.savedForRetirement.replace(',','').trim(),10);
        }
    });

    this.init = function(){
        this.focus = true;
        parent.displayButtons = true;
        parent.nextButton = 'Next';
        parent.nextDisabled = function(){
            return !_this.ageValid() || !_this.annualSalaryValid() || !_this.savedForRetirementValid();
        };
    };
    
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