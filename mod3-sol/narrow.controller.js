(function () {
'use strict';

angular.module('NarrowItDownApp')
.controller('NarrowItDownController', NarrowItDownController);

NarrowItDownController.inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrower = this;
  narrower.narrowIt = function() {
    console.log('button was clicked. searchTerm is '+ narrower.searchTerm);
    if (narrower.searchTerm == undefined || narrower.searchTerm.trim() == "") {
      narrower.foundItems = [];
    }
    else {
      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(narrower.searchTerm);
      foundItemsPromise.then(function(response) {
        // console.log("back to narrow.controller, foundItemPromise is ", foundItemsPromise);
        console.log("back to narrow.controller, foundItemPromise is ", foundItemsPromise.$$state.value); // is there a better way to access this data?? maybe by encapsulating it differently at the MenuSearchService side??
        narrower.foundItems = foundItemsPromise.$$state.value;
      })
    }
  }

  narrower.removeItem = function (itemIndex) {
    narrower.foundItems.splice(itemIndex,1);
  };

}

})();
