(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.foodlist = "";
  $scope.checkList = function() {
    $scope.message = parseList($scope.foodlist);
    console.log($scope.foodlist);
  };

  function parseList(string) {
    //removing leading and trailing whitespaces,
    // then splitting the string around the commas
    // and finally filtering any possible empty item in the middle
    // like the one between b and c "a,b,,c"
    /*
    some corner cases that require the filtering in order to get correctly handled
    s1= "   ,    ,    ,    ,";
    "   ,    ,    ,    ,"
    s2="                ";
    "                "
    s1.trim().split(',').filter(function(n){ return n.trim() != "" })
    []
    s1.trim().split(',').filter(function(n){ return n.trim() != "" }).length
    0
    without the filtering s1 will result as having 5 elements
    s1.trim().split(',')
    ["", "    ", "    ", "    ", ""]
    s1.trim().split(',').length
    5
    s2.trim().split(',').filter(function(n){ return n.trim() != "" }).length
    0
    s2.trim().split(',').filter(function(n){ return n.trim() != "" })
    []

    one more corner case:
    s3="a, b,  , c,,"
    "a, b,  , c,,"
    s3.trim().split(',').filter(function(n){ return n.trim() != "" })
    ["a", " b", " c"]
    s3.trim().split(',').filter(function(n){ return n.trim() != "" }).length
    3
    without the filtering it results and array with 6 items
    s3.trim().split(',')
    ["a", " b", "  ", " c", "", ""]
    s3.trim().split(',').length
    6
    */
    var desiredlist = string.trim().split(',').filter(function(n){ return n.trim() != "" });
    if (desiredlist.length == 0) {
      return "Please enter data first";
    }
    else if (desiredlist.length <= 3) {
      return "Enjoy";
    }
    else {
      return "Too much!";
    }
  }

}

// .controller('LunchCheckController', function ($scope) {
//   $scope.name = "";
//   $scope.totalValue = 0;
//
//   $scope.displayNumeric = function () {
//     var totalNameValue = calculatNumericForString($scope.name);
//     $scope.totalValue = totalNameValue;
//   };
//
//
//   function calculatNumericForString(string) {
//     var totalStringValue = 0;
//     for (var i = 0; i < string.length; i++) {
//       totalStringValue += string.charCodeAt(i);
//     }
//
//     return totalStringValue;
//   }
//
// });


})();
