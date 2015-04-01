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
                var currentTranslation = 55;
                var mode = 1;
                var secretFormula = 8;
                var max = 10;

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

                var circle_b = rsr.circle(187, 150, 30);
                circle_b.attr({fill: '#009ed1',stroke: '#009ed1',"stroke-width": '2'});

                var circle_c = rsr.circularArc(187, 150, 30, 17, 163);
                circle_c.attr({fill: '#1089b5',stroke: 'none'});
                circle.push(circle_c, circle_b);

                var shadow = rsr.ellipse(187, 200, 25, 7);
                shadow.attr({fill: '#d1d1d1',stroke: 'none','stroke-width':'1'});

                var scale = function(){
                    circle.animate({"transform": "...S" + [currentScale, currentScale, 187, 175]}, 500, "elastic", function(){
                        scope.scale = '';
                        scope.$apply();
                    });
                    TweenLite.to(arrowDOM, .2, {transform:'translateY('+(currentTranslation)+'px)'});
                    TweenLite.to(tabDOM, .2, {transform:'translateY('+(currentTranslation)+'px)'});
                    shadow.animate({"transform": "...S,"+ [currentScale, 1, 187, 200]}, 200, "elastic");
                };


                var bigger = function(){
                    if (max === 0) {
                        return;
                    }
                    mode = 1;
                    currentScale = 1.1;
                    currentTranslation -= secretFormula;
                    scale();
                    max--;
                };

                var smaller = function(){
                    mode = -1;
                    currentScale = 0.9;
                    currentTranslation += secretFormula;
                    scale();
                    max++;
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
                    for(var i=0;i< parseInt(value, 10); i++){
                        mode = 1;
                        currentScale = 1.1;
                        currentTranslation -= secretFormula;
                        circle.attr({"transform": "...S" + [currentScale, currentScale, 187, 175]});
                        TweenLite.to(arrowDOM, 0, {transform:'translateY('+(currentTranslation)+'px)'});
                        TweenLite.to(tabDOM, 0, {transform:'translateY('+(currentTranslation)+'px)'});
                        shadow.attr({"transform": "...S,"+ [currentScale, 1, 187, 200]});
                        max--;
                    }
                });
                TweenLite.to(arrowDOM, 0, {transform:'translateY(55px)'});
                TweenLite.to(tabDOM, 0, {transform:'translateY(55px)'});
            }
        };


    }]);

