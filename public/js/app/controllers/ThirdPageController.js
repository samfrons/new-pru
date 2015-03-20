angular.module('ob')

.controller('ThirdPageController', ['$scope', 'utils','retirment', function($scope, utils, retirment) {

    var parent = $scope.main;
    var _this = this;
    this.user = {};

    $scope.$watch('main.currentIndex', function(index){
        if(index === 2){
            _this.init();
        }
        if(index === 3){
            retirment.retirmentAge = parseInt(_this.user.minRetire,10);
            retirment.retirmentLast = parseInt(_this.user.maxRetire,10);
        }
    });

    this.init = function(){
        parent.displayButtons = true;
        parent.nextButton = 'Next';
    };

    this.realityMin = function(){
        return utils.isInf(65, this.user.minRetire);
    };

    this.realityMax = function(){
        return utils.isSup(75, this.user.minRetire);
    };

    this.realityMid = function(){
        return utils.isBetween(65, 75, this.user.minRetire);
    };

    this.futureMin = function(){
        return utils.isInf(100, this.user.minRetire, this.user.maxRetire);
    };

    this.futureMax = function(){
        return utils.isSup(120, this.user.minRetire, this.user.maxRetire);
    };

    this.futureMid = function(){
        return utils.isBetween(100, 120, this.user.minRetire, this.user.maxRetire);
    };

    }]);