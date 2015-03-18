angular.module('ob')
.controller('PageCarouselController', ['$scope', '$timeout', '$interval', '$transition', function ($scope, $timeout, $interval, $transition) {
    var self = this;
    var slides = self.slides = $scope.slides = [];
    var currentIndex = -1;
    self.currentSlide = null;

    var destroyed = false;
    /* direction: "prev" or "next" */
    self.select = $scope.select = function(nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        //Decide direction if it's not given
        if (direction === undefined) {
            direction = nextIndex > currentIndex ? 'next' : 'prev';
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
            if ($scope.$currentTransition) {
                $scope.$currentTransition.cancel();
                $timeout(goNext);
            } else {
                goNext();
            }
        }
        function goNext() {
            // Scope has been destroyed, stop here.
            if (destroyed) { return; }
            //If we have a slide to transition from and we have a transition type and we're allowed, go
            if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
                nextSlide.$element.addClass(direction);
                var reflow = nextSlide.$element[0].offsetWidth; //force reflow

                //Set all other slides to stop doing their stuff for the new transition
                angular.forEach(slides, function(slide) {
                    angular.extend(slide, {direction: '', entering: false, leaving: false, active: false});
                });
                angular.extend(nextSlide, {direction: direction, active: true, entering: true});
                angular.extend(self.currentSlide||{}, {direction: direction, leaving: true});

                $scope.$currentTransition = $transition(nextSlide.$element, {});
                //We have to create new pointers inside a closure since next & current will change
                (function(next,current) {
                    $scope.$currentTransition.then(
                        function(){ transitionDone(next, current); },
                        function(){ transitionDone(next, current); }
                    );
                }(nextSlide, self.currentSlide));
            } else {
                transitionDone(nextSlide, self.currentSlide);
            }
            self.currentSlide = nextSlide;
            currentIndex = nextIndex;
        }
        function transitionDone(next, current) {
            angular.extend(next, {direction: '', active: true, leaving: false, entering: false});
            angular.extend(current||{}, {direction: '', active: false, leaving: false, entering: false});
            $scope.$currentTransition = null;
            $scope.animationDone();
        }
    };

    /* Allow outside people to call indexOf on slides array */
    self.indexOfSlide = function(slide) {
        return slides.indexOf(slide);
    };

    $scope.next = function() {
        var newIndex = (currentIndex + 1) % slides.length;

        //Prevent this user-triggered transition from occurring if there is already one in progress
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], 'next');
        }
    };

    $scope.prev = function() {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;

        //Prevent this user-triggered transition from occurring if there is already one in progress
        if (!$scope.$currentTransition) {
            return self.select(slides[newIndex], 'prev');
        }
    };
    $scope.$watch('currentIndex', function(index) {
        if (index !== currentIndex) {
            if(index === -1){
                self.select(slides[0],'prev');
                $scope.currentIndex = 0;
            }else{
                if(index > currentIndex){
                    for(var i=0;i<index - currentIndex;i++){
                        $scope.next();
                    }
                }else{
                    for(var i=0;i<currentIndex - index;i++){
                        $scope.prev();
                    }
                }
            }
        }
    });
    $scope.isActive = function(slide) {
        return self.currentSlide === slide;
    };

    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        //if this is the first slide or the slide is set to active, select it
        if(slides.length === 1 || slide.active) {
            self.select(slides[slides.length-1]);
        } else {
            slide.active = false;
        }
    };

}])



.directive('pageCarousel', [function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'PageCarouselController',
        require: 'pageCarousel',
        templateUrl: 'template/pageCarousel/pageCarousel.html',
        scope: {
            currentIndex: '=',
            animationDone: '&'
        }
    };
}])

.directive('page', function() {
    return {
        require: '^pageCarousel',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'template/pageCarousel/page.html',
        scope: {
            active: '=?',
            isActive: '&'
        },
        link: function (scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);

            scope.$watch('active', function(active) {
                if (active) {
                    carouselCtrl.select(scope);
                }
            });
        }
    };
});