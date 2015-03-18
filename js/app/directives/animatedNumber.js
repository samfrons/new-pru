angular.module('ob')

.directive('animatedNumber', [function () {
    return {
        restrict: 'E',
        scope: {
            number: '='
        },
        replace: true,
        template: '<div>{{number}}</div>',
        link: function(scope, element, attrs) {
            var oldValue = -1;
            scope.$watch('number',function(value){
                var animationClass = '';
                if(oldValue > value){
                    animationClass = 'slideDown';
                }else{
                    animationClass = 'slideUp';
                }
                oldValue = value;
                element.addClass(animationClass);
                setTimeout(function(){
                    element.removeClass(animationClass);
                },300);
            });
        }
    };
}]);