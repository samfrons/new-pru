angular.module('ob')

.directive('centeredMenu', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          selected: '@'
        },
        template: "<ul class='nav nav-tabs' style='width: 1000px;margin-left: 130px;' ng-transclude></ul>",
        link: function(scope, element, attrs) {
            var oldSelected = 0;
            scope.$watch('selected',function(selected){
                if(selected > oldSelected){
                    scope.goLeft();
                }else{
                    scope.goRight();
                }
            });

            var translate = function(){
                var move = 0;
                for(var i = 0;i < scope.selected-1; i++){
                    move += element[0].children[i].offsetWidth + 20;
                }
                return move;
            };

            scope.goLeft = function(){
                TweenLite.to(element[0], .2, {transform:'translateX(-'+translate()+'px)'});
            };

            scope.goRight = function(){
                console.log('right '+scope.selected);
                TweenLite.to(element[0], .2, {transform:'translateX('+translate()+'px)'});
            };

        }
    };
}])
.directive('menu', function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        template: "<li style='text-align: center;' ng-transclude></li>",
        link: function (scope, element, attrs) {
        }
    };
});