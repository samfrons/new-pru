angular.module('ob')

.directive('animatedNumber', ['$animate',function ($animate) {
    return {
        restrict: 'E',
        scope: {
            number: '=',
            select: '@',
            clicked: '&',
            moreClicked: '&',
            lessClicked: '&'
        },
        replace: true,
        template: "<div class='row controls animated-number'> \
        <button class='btn btn-default' ng-class='{disable: !selected}' ng-click='less()'><span class='arrow-less'/></button> \
        <h4 class='labels navy'><div class='number'>{{ number }}</div><span class='percent'>%</span></h4> \
        <button class='btn btn-default' ng-class='{disable: !selected}' ng-click='more()'><span class='arrow-more'/></button> \
        </div>",
        link: function(scope, element, attrs) {
            var numberElement = angular.element(element[0].children[1].children[0]);
            var circle1 = angular.element(element[0].children[0]);
            var circle2 = angular.element(element[0].children[2]);
            scope.selected = false;
            scope.$watch('select', function(value){
                if(value == 'true'){
                    scope.selected = true
                }else{
                    scope.selected = false;
                }
            });
            scope.more = function(){
                if(scope.number == 10) {
                    return;
                } 
                scope.number++;
                scope.selected = true;
                scope.clicked();
                scope.moreClicked({number: scope.number});
                $animate.addClass(numberElement, 'slideDown', function(){
                    $animate.removeClass(numberElement, 'slideDown');
                });
                
            };

            scope.less = function(){
                if(scope.number == 0) {
                    return;
                } 
                scope.number--;
                scope.selected = true;
                scope.clicked();
                scope.lessClicked({number: scope.number});
                $animate.addClass(numberElement, 'slideUp',function(){
                    $animate.removeClass(numberElement, 'slideUp');
                });
            
            };
        }
    };
}]);