angular.module('ob')

.factory('retirment', [
function() {
    var serviceAPI = {
        age: 0,
        retirmentAge: 0,
        retirmentLast: 0,
        percentContributed: 0,
        salary: 0,
        interestRate: 0.06,
        inflationRate: 0.03,
        savedForRetirment: 0,
        totalSaving: function(){
            return this.savedForRetirment + Math.round(this.percentContributed * this.salary * (Math.pow(1 + this.interestRate, this.yearBeforeRetirment()) - Math.pow(1 + this.inflationRate, this.yearBeforeRetirment())) / (this.interestRate - this.inflationRate));
        },
        yearBeforeRetirment: function(){
            return this.retirmentAge - this.age;
        },
        savingPerYear: function(){
            return this.totalSaving() / this.retirmentLast;
        }
    };
    return serviceAPI;
}]);