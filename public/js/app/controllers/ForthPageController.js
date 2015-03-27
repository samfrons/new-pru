angular.module('ob')

.controller('ForthPageController', ['$scope', 'utils', 'retirement', function($scope, utils, retirement) {

    var parent = $scope.main;
    var _this = this;
    this.info = false;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 3){
            _this.init();
        }
        if(index === 4){
            if(_this.user.contributionPlan === 'percentage'){                
                if(_this.user.match){
                    retirement.companyPercentContributed = _this.user.contributionCompany / 100;
                }else{
                    retirement.companyPercentContributed = 0;
                }
                retirement.userPercentContributed = _this.user.contribution / 100;
            }else{
                retirement.percentContributed = 0.03;
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