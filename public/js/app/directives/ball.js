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

                var invisibleCircle = rsr.set();

                var circle_b_inv = rsr.circle(1187, 1150, 30);
                circle_b_inv.attr({fill: 'none',stroke: 'none',"stroke-width": '2'});

                var circle_c_inv = rsr.circularArc(1187, 1150, 30, 17, 163);
                circle_c_inv.attr({fill: 'none',stroke: 'none'});
                invisibleCircle.push(circle_c_inv, circle_b_inv);

                var shadow = rsr.ellipse(187, 200, 25, 7);
                shadow.attr({fill: '#d1d1d1',stroke: 'none','stroke-width':'1'});

                var translate = 70;

                var scale = function(){
                    invisibleCircle.attr({"transform": "s" + [currentScale, currentScale, 1187, 1175]});
                    translate -= invisibleCircle.getBBox().height - circle.getBBox().height;
                    circle.animate({"transform": "s" + [currentScale, currentScale, 187, 175]}, 500, "elastic", function(){
                        scope.scale = '';
                        scope.$apply();
                    });
                    TweenLite.to(arrowDOM, .5, {transform:'translateY('+(translate)+'px)', ease:Elastic.easeOut});
                    TweenLite.to(tabDOM, .5, {transform:'translateY('+(translate)+'px)', ease:Elastic.easeOut});
                    shadow.animate({"transform": "s,"+ [currentScale, 1, 187, 200]}, 500, "elastic");
                };


                var bigger = function(){
                    if(invisibleCircle.getBBox().height >= 165){
                        return;
                    }
                    currentScale += 0.4;
                    scale();
                };

                var smaller = function(){
                    if(invisibleCircle.getBBox().height <= 20){
                        return;
                    }
                    currentScale -= 0.4;
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
                    for(var i=0;i< parseInt(value, 10); i++){
                        if(invisibleCircle.getBBox().height >= 165){
                            return;
                        }
                        currentScale += 0.4;
                        invisibleCircle.attr({"transform": "s" + [currentScale, currentScale, 1187, 1175]});
                        translate -= invisibleCircle.getBBox().height - circle.getBBox().height;
                        circle.attr({"transform": "s" + [currentScale, currentScale, 187, 175]});
                        TweenLite.to(arrowDOM, 0, {transform:'translateY('+(translate)+'px)'});
                        TweenLite.to(tabDOM, 0, {transform:'translateY('+(translate)+'px)'});
                        shadow.attr({"transform": "s,"+ [currentScale, 1, 187, 200]});
                    }
                });
                TweenLite.to(arrowDOM, 0, {transform:'translateY(70px)'});
                TweenLite.to(tabDOM, 0, {transform:'translateY(70px)'});
            }
        };


    }]);