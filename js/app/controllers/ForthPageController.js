angular.module('ob')

.controller('ForthPageController', ['$scope', 'utils', function($scope, utils) {

    var parent = $scope.main;
    var _this = this;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 3){
            _this.init();
        }
    });

    this.init = function(){
        parent.displayButtons = true;
        parent.nextButton = 'Calculate';
    };

    this.user = {
        contribution: 1
    };

    this.moreContribution = function(){
        this.user.contribution++;
    };

    this.lessContribution = function(){
        if(this.user.contribution === 0){
            return;
        }
        this.user.contribution--;
    };
}]);