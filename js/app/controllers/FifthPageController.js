angular.module('ob')

.controller('FifthPageController', ['$scope', 'utils', function($scope, utils) {

        var parent = $scope.main;
        var _this = this;

        $scope.$watch('main.currentIndex', function(index){
            if(index === 4){
                _this.init();
            }
        });

        this.init = function(){
            parent.displayButtons = true;
            parent.nextButton = 'Next';
        };

        this.increase = 1;

        this.moreIncrease = function(){
            this.increase++;
        };

        this.lessIncrease = function(){
            if(this.increase === 0){
                return;
            }
            this.increase--;
        };

}]);