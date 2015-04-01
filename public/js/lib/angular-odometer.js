angular.module('ui.odometer', []).provider('odometerOptions', function() {
  var self;
  self = this;
  self.defaults = {
    value: 0,
    format: '(,ddd)'
  };
  this.$get = function() {
    return angular.copy(self.defaults);
  };
  return this;
}).directive('odometer', [
  'odometerOptions', function(odometerOptions) {
    return {
      restrict: 'A',
      scope: {
        odometer: '@'
      },
      link: function(scope, elm, attrs) {
        var odometer, opts;
        opts = scope.$eval(attrs.odometerOptions) || {};
        angular.extend(opts, odometerOptions);
        opts.el = elm[0];
        odometer = new Odometer(opts);
        scope.$watch('odometer', function(newVal) {
          console.log(newVal);
          odometer.update(newVal);
        });
      }
    };
  }
]);
