angular.module('ob')

.controller('ForthPageController', ['$scope', 'utils', 'retirment', function($scope, utils, retirment) {

    var parent = $scope.main;
    var _this = this;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 3){
            _this.init();
        }
        if(index === 4){
            if(_this.user.contributionPlan === 'percentage'){
                retirment.percentContributed = _this.user.contribution / 100;
            }else{
                retirment.percentContributed = 0.03;
            }
        }
    });

    this.init = function(){
        parent.displayButtons = true;
        parent.nextButton = 'Calculate';
    };

    this.user = {
        contribution: 1,
        contributionPlan: 'percentage'
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