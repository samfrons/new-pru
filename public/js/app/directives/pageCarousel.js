angular.module('ob')
.controller('PageCarouselController', ['$scope', '$interval', '$animate', function ($scope, $interval, $animate) {
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
            goNext();
        }
        function goNext() {
            // Scope has been destroyed, stop here.
           if (destroyed) { return; }

          angular.extend(nextSlide, {direction: direction, active: true});
          angular.extend(self.currentSlide || {}, {direction: direction, active: false});

          if ($animate.enabled() && !$scope.noTransition && nextSlide.$element) {
            $scope.$currentTransition = true;
            // TODO: Switch to use .one when upgrading beyond 1.2.21
            // (See https://github.com/angular/angular.js/pull/5984)
            nextSlide.$element.on('$animate:close', function closeFn() {
              $scope.$currentTransition = null;
              nextSlide.$element.off('$animate:close', closeFn);
              $scope.animationDone();
            });
          }

          self.currentSlide = nextSlide;
          currentIndex = nextIndex;
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
        templateUrl: '/bundles/droga5optimismbias/template/pageCarousel/pageCarousel.html',
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
        templateUrl: '/bundles/droga5optimismbias/template/pageCarousel/page.html',
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
})
.animation('.item', [
         '$animate',
function ($animate) {
  return {
    beforeAddClass: function (element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className == 'active' && element.parent() &&
          !element.parent().scope().noTransition) {
        var stopped = false;
        var direction = element.isolateScope().direction;
        var directionClass = direction == 'next' ? 'left' : 'right';
        element.addClass(direction);
        $animate.addClass(element, directionClass,function () {
          if (!stopped) {
            element.removeClass(directionClass + ' ' + direction);
          }
          done();
        });

        return function () {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className == 'active' && element.parent() &&
          !element.parent().scope().noTransition) {
        var stopped = false;
        var direction = element.isolateScope().direction;
        var directionClass = direction == 'next' ? 'left' : 'right';
        $animate.addClass(element, directionClass,function () {
          if (!stopped) {
            element.removeClass(directionClass);
          }
          done();
        });
        return function () {
          stopped = true;
        };
      }
      done();
    }
  };

}]);