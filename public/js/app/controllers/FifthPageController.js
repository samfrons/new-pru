angular.module('ob')

.controller('FifthPageController', ['$scope', 'utils', '$timeout', 'retirement', '$animate', function($scope, utils, $timeout, retirement, $animate) {

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
                    totalSaving: retirement.totalSaving(),
                    yearBeforeRetirement: retirement.yearBeforeRetirement(),
                    savingPerYear: retirement.savingPerYear(),
                    inflationRate: retirement.inflationRate * 100,
                    annualContribution: (retirement.userPercentContributed * 100) + (retirement.companyPercentContributed * 100) ,
                    retirementLast: retirement.retirementLast,
                    realityCheck: retirement.realityCheck()
                };
                _this.increase = retirement.userPercentContributed * 100;
                _this.calculate();
            }, 0);     
        };
        
        this.resultMode = parent.isMobile();
        this.calculMode = !parent.isMobile();
        this.progress = 0;
        this.increase = 1;
        this.slot = false;
        this.infoMode = false;
        this.circle = {scale: 'normal'};

        this.more = function(increase){
            this.circle.scale = 'grow';
            retirement.userPercentContributed = increase / 100;
            this.result.savingPerYear = retirement.savingPerYear();
            this.result.realityCheck = retirement.realityCheck();
        };

        this.less = function(increase){
            this.circle.scale = 'smaller';
            retirement.userPercentContributed = increase / 100;
            this.result.savingPerYear = retirement.savingPerYear();
            this.result.realityCheck = retirement.realityCheck();
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
            if(parent.isMobile()){
                return;
            }
            calculatePhases.init();
        };
}]);