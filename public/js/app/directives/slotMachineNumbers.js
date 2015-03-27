angular.module('ob')

.directive('slotMachineNumbers', ['$animate',function ($animate) {
    return {
        restrict: 'E',
        scope: {
            number: '@'
        },
        replace: true,
        template: "<span class='number'>{{ number | number : 0 }}</span>",
        link: function(scope, element, attrs) {
            var numberElement = angular.element(element[0]);
            var oldNumber = 0;
            scope.$watch('number', function(value){

                if (parseInt(value,10) > oldNumber){
                    scope.more();
                } else{
                    scope.less();
                }

                oldNumber = parseInt(value,10);
            });
            scope.more = function(){
                $animate.addClass(numberElement, 'slideDown', function(){
                    $animate.removeClass(numberElement, 'slideDown');
                });
                
            };

            scope.less = function(){
                $animate.addClass(numberElement, 'slideUp',function(){
                    $animate.removeClass(numberElement, 'slideUp');
                });
            
            };
        }
    };
}]);