angular.module('ob')

.factory('retirement', [
function() {
    var serviceAPI = {
        age: 0,
        retirementAge: 0,
        retirementLast: 0,
        userPercentContributed: 0,
        companyPercentContributed: 0,
        salary: 0,
        interestRate: 0.06,
        inflationRate: 0.03,
        savedForRetirement: 0,
        totalSaving: function(){
            var percentContributed = this.userPercentContributed + this.companyPercentContributed;
            return this.savedForRetirement + Math.round(percentContributed * this.salary * (Math.pow(1 + this.interestRate, this.yearBeforeRetirement()) - Math.pow(1 + this.inflationRate, this.yearBeforeRetirement())) / (this.interestRate - this.inflationRate));
        },
        yearBeforeRetirement: function(){
            return this.retirementAge - this.age;
        },
        savingPerYear: function(){
            console.log(this.totalSaving());
            console.log(this.retirementLast);
            return this.totalSaving() / this.retirementLast;

        }
    };
    return serviceAPI;
}]);