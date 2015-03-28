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
            template: '<div></div>',
            link: function(scope, element, attrs) {
                var arrowDOM = element.parent().children()[1];
                var tabDOM = element.parent().children()[0];
                
                var currentScale = 1;
                var currentTranslation = 0;
                var mode = 1;
                var secretFormula = 5 + currentScale * 5;

                window.Raphael && (Raphael.fn.arc = function(a, b, c, d, e, f, g) {
                    var h = [e, f, g, 0, 1, c, d].join(" "),
                        i = [.9 * e, .45 * e, g, 0, 1, a, b].join(" ");
                    return this.path("M" + a + " " + b + "a" + h + "A" + i)
                }), window.Raphael && (Raphael.fn.circularArc = function(a, b, c, d, e) {
                    var f = a + c * Math.cos(d * Math.PI / 180),
                        g = b + c * Math.sin(d * Math.PI / 180),
                        h = a + c * Math.cos(e * Math.PI / 180),
                        i = b + c * Math.sin(e * Math.PI / 180);
                    return this.arc(f, g, h - f, i - g, c, c, 0)
                });

                var rsr = Raphael(element[0], '400', '390');

                var circle = rsr.set();

                var circle_b = rsr.circle(130, 170, 60);
                circle_b.attr({fill: '#009ed1',stroke: '#009ed1',"stroke-width": '2'});

                var circle_c = rsr.circularArc(130, 170, 60, 17, 163);
                circle_c.attr({fill: '#1089b5',stroke: 'none'});
                circle.push(circle_c, circle_b);

                var shadow = rsr.ellipse(100, 450, 55, 7);
                shadow.attr({fill: '#d1d1d1',stroke: 'none','stroke-width':'1'});

                var scale = function(){
                    console.log(currentScale);
                    circle.animate({"transform": "...S" + [currentScale, currentScale, 100, 130]}, 1000, "elastic");
                    /*
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
                    }});*/
                    TweenLite.to(arrowDOM, .1, {css:{transform:'translateY('+currentTranslation+'px)'}});
                    TweenLite.to(tabDOM, .1, {css:{transform:'translateY('+currentTranslation+'px)'}});
                    //TweenLite.to(shadowDOM, .2, {css:{transform:'translateY('+(-currentTranslation)+'px)scaleX('+currentScale+')'}});
                };


                var bigger = function(){
                    //if (currentScale >= 1) {
                    //    return;
                    //} 
                    mode = 1;
                    currentScale += 0.12;
                    currentTranslation -= secretFormula;
                    scale();
                };

                var smaller = function(){
                    //if (currentScale <= 0.2) {
                    //    return;
                    //}
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
                //TweenLite.to(circleDOM, .15, {css:{transform:'scale('+currentScale+')'}, onComplete: function(){

                //}});
            }
        };


    }]);

