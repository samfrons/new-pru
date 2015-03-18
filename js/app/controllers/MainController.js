angular.module('ob')

.controller('MainController', [function() {
    this.displayButtons = false;
    this.nextButton = '';
    this.nextDisabled = function(){
        return false;
    };

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
}]);