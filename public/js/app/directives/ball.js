angular.module('ob')

    .directive('ball', ['$animate',function ($animate) {
        return {
            restrict: 'E',
            scope: {
                scale: '=',
                intro: '@'
            },
            replace: true,
            template: '<div><div class="circle"> \
                        <span class="inner"></span> \
                       </div> \
                       <div class="shadow"></div></div>',
            link: function(scope, element, attrs) {
                var circleDOM = element[0].children[0];
                var arrowDOM = element.parent().children()[1];
                var tabDOM = element.parent().children()[0];
                var shadowDOM = element[0].children[1];
                    console.log(arrowDOM);
                var currentScale = 1;
                var currentTranslation = 0;

                var scale = function(){
                    var tween = TweenLite.to(circleDOM, .2, {transform:'scale('+currentScale+')'});
                    TweenLite.to(arrowDOM, .2, {transform:'translateY('+currentTranslation+'px)'});
                    TweenLite.to(tabDOM, .2, {transform:'translateY('+currentTranslation+'px)'});
                    TweenLite.to(shadowDOM, .2, {transform:'translateY('+(-currentTranslation)+'px)scaleX('+currentScale+')'});
                    tween.eventCallback('onComplete', function(){
                        scope.scale = '';
                        scope.$apply();
                    });
                };

                var bigger = function(){
                    currentScale += 0.2;
                    currentTranslation -= 8 + currentScale * 5;
                    scale();
                };

                var smaller = function(){
                    currentScale -= 0.2;
                    currentTranslation += 8 + currentScale * 5;
                    scale();
                };

                scope.$watch('scale', function(value){
                    if(value == 'grow'){
                        bigger();
                    }else if(value == 'smaller'){
                        smaller();
                    }
                });
                scope.$watch('intro', function(value){

                });
            }
        };
    }]);