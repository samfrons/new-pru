angular.module('ob')

.controller('MainController', ['$window', '$scope',function($window, $scope) {
    this.displayButtons = false;
    this.nextButton = '';
    this.nextDisabled = function(){
        return false;
    };
    var _this = this;
    this.animation = false;

    this.currentIndex = 0;

    this.animationDone = function(){
        this.animation = false;
    };
    this.next = function(){
        if(this.animation){
            return;
        }
        this.animation = true;
        this.currentIndex++;
    };

    this.prev = function(){
        if(this.animation){
            return;
        }
        this.animation = true;
        this.currentIndex--;
    };

    this.startOver = function(){
        if(this.animation){
            return;
        }
        this.animation = true;
        this.currentIndex = -1;
    };

    $scope.isMobile = function(){
        return $window.innerWidth < 768;
    }
    var w = angular.element($window);
    w.bind('resize', function () {
        $scope.$apply();
    });
}]);