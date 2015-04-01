angular.module('ob')
.directive('formatMoney', [function () {
    return {
        restrict: 'A',
        scope: {
            field: '=',
            max: '@'
        },
        replace: true,
        template: '<span><div class="input-group right"><span class="input-group-addon dollar">$</span><input type="text" ng-model="field" /></div></span>',
        link: function(scope, element, attrs) {
                var max;
                var historyValue = '';
                if (angular.isUndefined(scope.max)) {
                    max= 9;
                }
                else {
                    max= scope.max;
                }
            function spliceSlice(str, index, count, add) {
                return str.slice(0, index) + (add || "") + str.slice(index + count);   
            }
            (element).bind('keyup', function(e) {
                var input = element.find('input');
                var inputVal = input.val();
                if (inputVal.length >= max) {
                    scope.$apply(function() {scope.field = historyValue});
                    return;
                }

                scope.field = scope.field.replace(/[^\d.\',']/g, '');

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
                var res = intPart + decPart;
                historyValue = res;
                scope.$apply(function() {scope.field = res});

            });

        }
    };
}])
.directive('onlyInteger', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function deleteNonInteger(text) {
                var transformedInput = text.replace(/[^0-9]/g, '');
                if(!angular.isUndefined(attr.max)){
                    transformedInput = transformedInput.slice(0,parseInt(attr.max, 10));
                }
                if(transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(deleteNonInteger);
        }
    };
});