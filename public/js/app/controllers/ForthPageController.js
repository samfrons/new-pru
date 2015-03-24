angular.module('ob')

.controller('ForthPageController', ['$scope', 'utils', 'retirment', function($scope, utils, retirment) {

    var parent = $scope.main;
    var _this = this;
    this.info = false;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 3){
            _this.init();
        }
        if(index === 4){
            if(_this.user.contributionPlan === 'percentage'){
                var totalContribution = 0;
                console.log();
                if(_this.user.match){
                    totalContribution += _this.user.contributionCompany;
                }
                totalContribution += _this.user.contribution;
                retirment.percentContributed = totalContribution / 100;
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
        contributionCompany: 1
    };

}]);