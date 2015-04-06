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
        inflationRate: 3,
        savedForRetirement: 0,
        principal: function(){
            var socialSecurity = this.retirementLast * 12 * 1294;
            return this.savedForRetirement + ((this.userPercentContributed * this.salary) + (this.salary * Math.min(this.userPercentContributed, this.companyPercentContributed))) * this.yearBeforeRetirement() + socialSecurity;
        },
        totalSaving: function(){
          return this.principal() * Math.pow(1 + this.interestRate, this.retirementLast);  
        },
        yearBeforeRetirement: function(){
            return this.retirementAge - this.age;
        },
        savingPerYear: function(){
            return this.totalSaving() / this.retirementLast;
        },
        realityCheck: function(){
            return this.savingPerYear() * Math.pow(1 + this.inflationRate/100, -this.retirementLast);
            //return this.savingPerYear() - (this.savingPerYear() * this.inflationRate)
        },
    };
    return serviceAPI;
}]);