angular.module('dragon', ['ui.bootstrap'])





  .controller('MainController', [function() {
    this.user = {
      contribution: 1
    };
    this.increase = 1;
    this.animation = false;

    this.currentIndex = 0;

    this.animationDone = function(){
      this.animation = false;
    };
    this.next = function(){
      if(this.animation){
        return;
      }
      this.animation = true;
      this.currentIndex++;
    };

    this.prev = function(){
      if(this.animation){
        return;
      }
      this.animation = true;
      this.currentIndex--;
    };

    this.ageValid = function(){
      if(angular.isUndefined(this.user.age) || this.user.age === null || this.user.age === ''){
        return false;
      }
      if(this.user.age == parseInt(this.user.age,10)){
        return true;
      }
      return false;
    };

    this.annualSalaryValid = function(){
      if(angular.isUndefined(this.user.annualSalary) || this.user.annualSalary === null || this.user.annualSalary === ''){
        return false;
      }
      return true;
    };

    this.savedForRetirementValid = function(){
      if(angular.isUndefined(this.user.savedForRetirement) || this.user.savedForRetirement === null || this.user.savedForRetirement === ''){
        return false;
      }
      return true;
    };

    this.disabled = function(){
      return !this.ageValid() || !this.annualSalaryValid() || !this.savedForRetirementValid();
    };

    this.realityMin = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === ''){
        return false;
      }
      if(this.user.minRetire == parseInt(this.user.minRetire, 10)){
        if(parseInt(this.user.minRetire,10) <= 65){
          return true;
        }
      }

      return false;
    };

    this.realityMax = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === ''){
        return false;
      }
      if(this.user.minRetire == parseInt(this.user.minRetire, 10)){
        if(parseInt(this.user.minRetire,10) > 75){
          return true;
        }
      }

      return false;
    };

    this.realityMid = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === ''){
        return false;
      }
      if(this.user.minRetire == parseInt(this.user.minRetire, 10)){
        if(parseInt(this.user.minRetire,10) > 65 && parseInt(this.user.minRetire,10) <= 75){
          return true;
        }
      }

      return false;
    };

    this.futureMin = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === '' || this.user.minRetire != parseInt(this.user.minRetire, 10)){
        return false;
      }
      if(angular.isUndefined(this.user.maxRetire) || this.user.maxRetire === null || this.user.maxRetire === ''){
        return false;
      }
      if(this.user.maxRetire == parseInt(this.user.maxRetire, 10)){
        if(parseInt(this.user.maxRetire,10) + parseInt(this.user.minRetire,10) <= 100){
          return true;
        }
      }

      return false;
    };

    this.futureMax = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === '' || this.user.minRetire != parseInt(this.user.minRetire, 10)){
        return false;
      }
      if(angular.isUndefined(this.user.maxRetire) || this.user.maxRetire === null || this.user.maxRetire === ''){
        return false;
      }
      if(this.user.maxRetire == parseInt(this.user.maxRetire, 10)){
        if(parseInt(this.user.maxRetire,10) + parseInt(this.user.minRetire,10) >= 120){
          return true;
        }
      }

      return false;
    };

    this.futureMid = function(){
      if(angular.isUndefined(this.user.minRetire) || this.user.minRetire === null || this.user.minRetire === '' || this.user.minRetire != parseInt(this.user.minRetire, 10)){
        return false;
      }
      if(angular.isUndefined(this.user.maxRetire) || this.user.maxRetire === null || this.user.maxRetire === ''){
        return false;
      }
      if(this.user.maxRetire == parseInt(this.user.maxRetire, 10)){
        if(parseInt(this.user.maxRetire,10) + parseInt(this.user.minRetire,10) > 100 && parseInt(this.user.maxRetire,10) + parseInt(this.user.minRetire,10) < 120){
          return true;
        }
      }

      return false;
    };

    this.moreContribution = function(){
      this.user.contribution++;
    };

    this.lessContribution = function(){
      if(this.user.contribution === 0){
        return;
      }
      this.user.contribution--;
    };


    this.moreIncrease = function(){
      this.increase++;
    };

    this.lessIncrease = function(){
      if(this.increase === 0){
        return;
      }
      this.increase--;
    };

    this.startOver = function(){
      if(this.animation){
        return;
      }
      this.animation = true;
      this.currentIndex = -1;
    };
  }])










    .controller('CarouselSpecController', ['$scope', '$timeout', '$interval', '$transition', function ($scope, $timeout, $interval, $transition) {
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
    .directive('carouselSpec', [function() {
      return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'CarouselSpecController',
        require: 'carouselSpec',
        templateUrl: '/bundles/droga5optimismbias/template/carouselSpec/carouselSpec.html',
        scope: {
          currentIndex: '=',
          animationDone: '&'
        }
      };
    }])

    .directive('slideSpec', function() {
      return {
        require: '^carouselSpec',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: '/bundles/droga5optimismbias/template/carouselSpec/slideSpec.html',
        scope: {
          active: '=?'
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

    .directive('formatMoney', ['$filter', function ($filter) {
      return {
        restrict: 'A',
        scope: {
          field: '='
        },
        replace: true,
        template: '<span><input type="text" ng-model="field"></input></span>',
        link: function(scope, element, attrs) {
          function spliceSlice(str, index, count, add) {
            return str.slice(0, index) + (add || "") + str.slice(index + count);
          }
          (element).bind('keyup', function(e) {
            var input = element.find('input');
            var inputVal = input.val();

            //scope.field = scope.field.replace(/[^\d.\',']/g, '');

            var point = scope.field.indexOf(".");
            if (point >= 0) {
              scope.field = scope.field.slice(0, point + 3);
            }

            var decimalSplit = scope.field.split(".");
            var intPart = decimalSplit[0];
            var decPart = decimalSplit[1];

            intPart = intPart.replace(/[^\d]/g, '');
            if (intPart.length > 3) {
              var intDiv = Math.floor(intPart.length / 3);
              while (intDiv > 0) {
                var lastComma = intPart.indexOf(",");
                if (lastComma < 0) {
                  lastComma = intPart.length;
                }

                if (lastComma - 3 > 0) {
                  intPart = spliceSlice(intPart,lastComma - 3, 0, ",");
                }
                intDiv--;
              }
            }

            if (decPart === undefined) {
              decPart = "";
            }
            else {
              decPart = "." + decPart;
            }
            var res = '$ ' + intPart + decPart;
            if(res === '$ '){
              res = '';
            }


            scope.$apply(function() {scope.field = res});

          });

        }
      };
    }])

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