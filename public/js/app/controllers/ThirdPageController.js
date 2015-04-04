angular.module('ob')

.controller('ThirdPageController', ['$scope', 'utils','retirement', function($scope, utils, retirement) {

    var parent = $scope.main;
    var _this = this;
    this.user = {};
    this.focus = false;
    $scope.$watch('main.currentIndex', function(index){
        if(index === 2){
            _this.init();
        }
        if(index === 3){
            retirement.retirementAge = parseInt(_this.user.minRetire,10);
            retirement.retirementLast = parseInt(_this.user.maxRetire,10);
        }
    });

    this.init = function(){
        this.focus = true;
        parent.displayButtons = true;
        parent.nextButton = 'Next';
        parent.nextDisabled = function(){
            return !_this.validMinRate() || !_this.validMaxRate();
        };
    };

    this.validMinRate = function(){
        return utils.isInteger(this.user.minRetire) && this.user.minRetire.length > 1;
    };

    this.validMaxRate = function(){
        return utils.isInteger(this.user.maxRetire);
    };

    this.realityMin = function(){
        return this.validMinRate() && utils.isInf(59, this.user.minRetire);
    };

    this.realityMax = function(){
        return this.validMinRate() && utils.isSup(68, this.user.minRetire);
    };

    this.realityMid = function(){
        return this.validMinRate() && utils.isBetween(59, 68, this.user.minRetire);
    };

    this.futureMin = function(){
        return this.validMinRate() && this.validMaxRate() && utils.isInf(100, this.user.minRetire, this.user.maxRetire);
    };

    this.futureMax = function(){
        return this.validMinRate() && this.validMaxRate() && utils.isSup(120, this.user.minRetire, this.user.maxRetire);
    };

    this.futureMid = function(){
        return this.validMinRate() && this.validMaxRate() && utils.isBetween(100, 120, this.user.minRetire, this.user.maxRetire);
    };

    }]);