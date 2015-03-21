angular.module('ob')
.directive('formatMoney', [function () {
    return {
        restrict: 'A',
        scope: {
            field: '='
        },
        replace: true,
        template: '<span><div class="input-group right"><span class="input-group-addon dollar">$</span><input type="text" ng-model="field" /></div></span>',
        link: function(scope, element, attrs) {
            function spliceSlice(str, index, count, add) {
                return str.slice(0, index) + (add || "") + str.slice(index + count);
            }
            (element).bind('keyup', function(e) {
                var input = element.find('input');
                var inputVal = input.val();

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
                scope.$apply(function() {scope.field = res});

            });

        }
    };
}]);