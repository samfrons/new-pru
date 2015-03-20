angular.module('ob')

.controller('SixthPageController', ['$scope', 'utils', function($scope, utils) {

    var parent = $scope.main;
        var _this = this;

        $scope.$watch('main.currentIndex', function(index){
            if(index === 5){
                _this.init();
            }
        });

        this.init = function(){
            parent.displayButtons = false;
        };

}]);