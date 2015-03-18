angular.module('ob')

.factory('utils', [
function() {
    var serviceAPI = {
        isNull: function(array){
            var args = null;
            if(angular.isUndefined(array)){
                args = Array.prototype.slice.call(arguments);
            }else{
                args = array;
            }

            for(var i=0; i< args.length; i++){
                if(!angular.isUndefined(args[i]) && args[i] !== null && args[i] !== ''){
                    return false;
                }
            }
            return true;
        },
        isInteger: function(array){
            var args = null;
            if(angular.isUndefined(array)){
                args = Array.prototype.slice.call(arguments);
            }else{
                args = array;
            }

            if(this.isNull(args)){
                return false;
            }
            for(var i=0; i< args.length; i++){
                if(args[i] != parseInt(args[i],10)){
                    return false;
                }
            }
            return true;
        },
        isInf: function(inf){
            var args = Array.prototype.slice.call(arguments, 1);
            if(!this.isInteger(args)){
                return false;
            }
            return this.sum(args) <= inf;
        },
        isSup: function(sup){
            var args = Array.prototype.slice.call(arguments, 1);
            if(!this.isInteger(args)){
                return false;
            }
            return this.sum(args) >= sup;
        },
        isBetween: function(inf, sup){
            var args = Array.prototype.slice.call(arguments, 2);
            if(!this.isInteger(args)){
                return false;
            }
            return this.sum(args) > inf && this.sum(args) < sup;
        },
        sum: function(args){
            var sum = 0;
            for(var i=0; i< args.length; i++){
                sum += parseInt(args[i],10);
            }
            return sum;
        }
    };
    return serviceAPI;
}]);