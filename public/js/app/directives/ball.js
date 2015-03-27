angular.module('ob')

    .directive('ball', ['$animate',function ($animate) {
        return {
            restrict: 'E',
            scope: {
                scale: '=',
                intro: '@',
                initScale: '@'
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

                var currentScale = 1;
                var currentTranslation = 0;

                var scale = function(times){
                    TweenLite.to(circleDOM, .15, {transform:'scale('+(currentScale+0.15)+')', onComplete: function(){
                        TweenLite.to(circleDOM, .05, {transform:'scale('+(currentScale)+')', onComplete: function(){
                            scope.scale = '';
                            scope.$apply();
                            if(!angular.isUndefined(times)){
                                if(times > 0){
                                    currentScale += 0.2;
                                    currentTranslation -= 8 + currentScale * 5;
                                    scale(times-1);
                                }
                            }
                        }});
                    }});
                    TweenLite.to(arrowDOM, .2, {transform:'translateY('+currentTranslation+'px)'});
                    TweenLite.to(tabDOM, .2, {transform:'translateY('+currentTranslation+'px)'});
                    TweenLite.to(shadowDOM, .2, {transform:'translateY('+(-currentTranslation)+'px)scaleX('+currentScale+')'});
                };

                var bigger = function(){
                    currentScale += 0.2;
                    //currentTranslation -= 1 + currentScale / 2;
                    scale();
                };

                var smaller = function(){
                    currentScale -= 0.2;
                    //currentTranslation += 1 + currentScale / 2;
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
                scope.$watch('initScale', function(value){
                    currentScale += 0.2;
                    //currentTranslation -= 1 + currentScale / 2;
                    scale(parseInt(value, 10));
                });
            }
        };
    }]);