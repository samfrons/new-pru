angular.module('ob')

    .directive('slotMachineText', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div style="height: 50px;"><div ng-transclude></div></div>',
            link: function(scope, element, attrs) {
                var textDivs = element[0].element[0].children;

                var currentIndex = 0;

                var getText = function(index){
                    return textDivs[index].textContent;
                };

            }
        };
    }]);