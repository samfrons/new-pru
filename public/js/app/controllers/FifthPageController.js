angular.module('ob')

.controller('FifthPageController', ['$scope', 'utils', '$timeout', 'retirment', function($scope, utils, $timeout, retirment) {

        var parent = $scope.main;
        var _this = this;

        $scope.$watch('main.currentIndex', function(index){
            if(index === 4){
                _this.init();
            }
        });

        this.init = function(){
            parent.displayButtons = true;
            parent.nextButton = 'Next';
            $timeout(function () {            
                _this.result = {
                    totalSaving: retirment.totalSaving(),
                    yearBeforeRetirment: retirment.yearBeforeRetirment(),
                    savingPerYear: retirment.savingPerYear(),
                    inflationRate: retirment.inflationRate * 100,
                    annualContribution: retirment.percentContributed * 100,
                    retirmentLast: retirment.retirmentLast
                };
                _this.increase = retirment.percentContributed * 100;
                _this.calculate();
            }, 300);     
        };
        
        this.resultMode = false;
        this.calculMode = true;
        this.progress = 0;
        this.increase = 1;
        this.slot = false;
        this.infoMode = false;


        this.more = function(increase){
            retirment.percentContributed = increase / 100;
            this.result.savingPerYear = retirment.savingPerYear();
        };

        this.less = function(increase){
            retirment.percentContributed = increase / 100;
            this.result.savingPerYear = retirment.savingPerYear();

        };

        var calculatePhases = {
            init: function () {
                var self = this;
                $timeout(function () {
                    self.phase1();
                }, 1000);
            },
            phase1: function()
            {
                _this.progress = 25;
                var self = this;
                _this.slot = true;
                $timeout(function () {
                    self.phase2();
                }, 1000);
            },
            phase2: function () {
                _this.progress = 50;
                var self = this;
                _this.slot = true;
                $timeout(function () {
                    self.phase3();
                }, 1000);
            },
            phase3: function () {
                _this.progress = 75;
                var self = this;
                _this.slot = true;
                $timeout(function () {
                    self.phase4();
                }, 1000);
            },
            phase4: function () {
                _this.progress = 100;
                _this.slot = true;
                $timeout(function () {
                    _this.slot = true;
                    $timeout(function () {
                        _this.calculMode = false;
                        _this.resultMode = true;
                    },300);
                }, 1000);
            }
        };

        this.calculate = function(){
            calculatePhases.init();
        };
}]);