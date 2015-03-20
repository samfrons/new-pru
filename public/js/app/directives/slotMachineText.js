angular.module('ob')

    .directive('slotMachineText', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope:{
              increase: '='
            },
            templateUrl: '/bundles/droga5optimismbias/template/slotMachineText/slotMachineText.html',
            link: function(scope, element, attrs) {
                var textDivs = element[0].children[1].children[0].children[1].children;
                scope.currentIndex = 0;
                var translate = function(div, dist) {
                    var style = div.style;

                    if (!style) return;

                    style.webkitTransitionDuration =
                        style.MozTransitionDuration =
                            style.msTransitionDuration =
                                style.OTransitionDuration =
                                    style.transitionDuration = 300 + 'ms';

                    style.webkitTransform = 'translate(0,' + dist + 'px)' + 'translateZ(0)';
                    style.msTransform =
                        style.MozTransform =
                            style.OTransform = 'translateY(' + dist + 'px)';

                };

                var increaseIndex = function(){
                    scope.currentIndex++;
                    angular.forEach(textDivs,function(textDiv){
                        translate(textDiv, scope.currentIndex * -29);
                    });
                };

                scope.$watch('increase', function(value){
                    if(value){
                        increaseIndex();
                        scope.increase = false;
                    }
                });

            }
        };
    }]);