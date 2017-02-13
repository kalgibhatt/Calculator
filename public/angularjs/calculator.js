var calculator = angular.module('calculator', []);
calculator.controller('calculate', function($scope, $http) {
	
	$scope.calculate = function() {
		var inputRegex = new RegExp("^(-{0,1}[0-9.]+)([+-×÷]{1})(-{0,1}[0-9.]+)$");
		var matches = $scope.result.match(inputRegex);
		console.log(matches);
		var val1 = matches[1];
		var val2 = matches[3];
		var operator = matches[2];
		$http({
			method : "POST",
			url : '/calculate',
			data : {
				"val1" : val1,
				"val2" : val2,
				"operator" : operator
			}
		}).then(function(data) {
			$scope.result = data.data.result;
		}, function(error) {
			// TODO: Handle Error
		});
	};
	
	$scope.resetDisplay = function() {
		$scope.result = "";
	};
	
	$scope.display = function(button) {
		if($scope.result === undefined) {
			$scope.result = "";
		}
		var transformedInput = String($scope.result) + button;
		transformedInput = transformedInput.toLowerCase().replace(/[^0-9\+×÷\-\.]/g, '');
		
		var symbolIndices = [];
	   	for(var i=0; i<transformedInput.length;i++) {
	   	    if (transformedInput[i] === "+" || transformedInput[i] === "-"  || transformedInput[i] === "×"  || transformedInput[i] === "÷") {
	   	    	symbolIndices.push(i);
	   	    }
	   	}
	   	if(symbolIndices.length > 1) {
	   		for(var j = 0; j < symbolIndices.length - 1; j++) {
	   			transformedInput = transformedInput.substring(0,symbolIndices[j]) + transformedInput.substring(symbolIndices[j] + 1, transformedInput.length);
	   		}
	   	}
	   	var finalSymbolIndex = -1;
	   	for(var k=0; k<transformedInput.length;k++) {
	   	    if (transformedInput[k] === "+" || transformedInput[k] === "-"  || transformedInput[k] === "×"  || transformedInput[k] === "÷") {
	   	    	finalSymbolIndex = k;
	   	    }
	   	}
	   	var dotIndices = [];
	   	var begin = true;
	   	for(var l=0; l<transformedInput.length;l++) {
	   	    if (transformedInput[l] === ".") {
	   	    	if(begin === true) {
	   	    		begin = false;
	   	    	} else {
	   	    		transformedInput = transformedInput.substring(0,l) + transformedInput.substring(l + 1, transformedInput.length);
	   	    	}
	   	    }
	   	    if(l === finalSymbolIndex) {
	   	    	begin = true;
	   	    }
	   	}
	   	
	   	$scope.result = transformedInput;
	};
})
.directive('inputPattern', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {

         var transformedInput = inputValue.toLowerCase().replace(/[^0-9\+×÷\-\.]/g, '');
    	 var symbolIndices = [];
    	 for(var i=0; i<transformedInput.length;i++) {
    	     if (transformedInput[i] === "+" || transformedInput[i] === "-"  || transformedInput[i] === "×"  || transformedInput[i] === "÷") {
    	    	 symbolIndices.push(i);
    	     }
    	 }
    	 if(symbolIndices.length > 1) {
    		 for(var j = 0; j < symbolIndices.length - 1; j++) {
    			 transformedInput = transformedInput.substring(0,symbolIndices[j]) + transformedInput.substring(symbolIndices[j] + 1, transformedInput.length);
    		 }
    	 }
    	 var finalSymbolIndex = -1;
    	 for(var k=0; k<transformedInput.length;k++) {
    	     if (transformedInput[k] === "+" || transformedInput[k] === "-"  || transformedInput[k] === "×"  || transformedInput[k] === "÷") {
    	    	 finalSymbolIndex = k;
    	     }
    	 }
    	 var dotIndices = [];
    	 var begin = true;
    	 for(var l=0; l<transformedInput.length;l++) {
    	     if (transformedInput[l] === ".") {
    	    	 if(begin === true) {
    	    		 begin = false;
    	    	 } else {
    	    		 transformedInput = transformedInput.substring(0,l) + transformedInput.substring(l + 1, transformedInput.length);
    	    	 }
    	     }
    	     if(l === finalSymbolIndex) {
    	    	 begin = true;
    	     }
    	 }
         
         if (transformedInput!==inputValue) {
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
         }         

         return transformedInput;         
       });
     }
   };
});
//.directive('inputPattern', [function($parse) {
//	return {
//        restrict: "A",
//        require: '?ngModel',
//        compile: function(tElement, tAttrs) {
//            return function(scope, element, attrs, ngModel) {
//                element.bind("keypress", function(event) {
//                   var keyCode = event.which || event.keyCode;
//                   console.log($parse(attrs.ngModel));
////                   if (key < 48 || key > 57) { 
////                     if(key == 8 || key == 46){} //allow backspace and delete                                   
////                     else{
////                           if (e.preventDefault) e.preventDefault(); 
////                           e.returnValue = false; 
////                     }
////                   }
//                });
//            };
//        }
//    };
//}]);
