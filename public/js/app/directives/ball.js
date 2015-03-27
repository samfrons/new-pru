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

                var currentScale = 0.1;
                var currentTranslation = 0;
                var mode = 1;
                var secretFormula = 5 + currentScale * 5;

                var scale = function(times){
                    TweenLite.to(circleDOM, .15, {css:{transform:'scale('+(currentScale+(mode*0.15))+')'}, onComplete: function(){
                        TweenLite.to(circleDOM, .05, {css:{transform:'scale('+(currentScale)+')'}, onComplete: function(){
                            scope.scale = '';
                            scope.$apply();
                            if(!angular.isUndefined(times)){
                                if(times > 0){
                                    if (currentScale >= 1) {
                                        return;
                                    };
                                    currentScale += 0.12;
                                    currentTranslation -= secretFormula;
                                    scale(times-1);
                                };
                            }
                        }});
                    }});
                    TweenLite.to(arrowDOM, .1, {css:{transform:'translateY('+currentTranslation+'px)'}});
                    TweenLite.to(tabDOM, .1, {css:{transform:'translateY('+currentTranslation+'px)'}});
                    TweenLite.to(shadowDOM, .2, {css:{transform:'translateY('+(-currentTranslation)+'px)scaleX('+currentScale+')'}});
                };


                var bigger = function(){
                    if (currentScale >= 1) {
                        return;
                    } 
                    mode = 1;
                    currentScale += 0.12;
                    currentTranslation -= secretFormula;
                    scale();
                };

                var smaller = function(){
                    if (currentScale <= 0.2) {
                        return;
                    } ;
                    mode = -1;
                    currentScale -= 0.12;
                    currentTranslation += secretFormula;
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
                    currentScale += 0.12;
                    currentTranslation -= secretFormula;
                    scale(parseInt(value, 10));
                });
                TweenLite.to(circleDOM, .15, {css:{transform:'scale('+currentScale+')'}, onComplete: function(){

                }});
            }
        };


    }]);

