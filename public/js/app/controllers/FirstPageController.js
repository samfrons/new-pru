angular.module('ob')

.controller('FirstPageController', ['$scope', 'retirment', function($scope, retirment) {

    var parent = $scope.main;
    var _this = this;

    $scope.$watch('main.currentIndex', function(index){
        if(index === 0){
            _this.init();
        }
    });

    this.init = function(){
        parent.displayButtons = false;
    };


}]);