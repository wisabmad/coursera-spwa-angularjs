(function () {
'use strict';

angular.module('NarrowItDownApp')
.component('foundItems', {
  templateUrl: 'foundItems.template.html',
  controller: FoundItemsComponentController,
  bindings: {
    foundItems: '<',
    onRemove: '&'
  }
});

function FoundItemsComponentController() {
  var $ctrl = this;

  $ctrl.remove = function (myIndex) {
    $ctrl.onRemove({ index: myIndex });
  };
  $ctrl.isEmpty = function () {
    if ($ctrl.foundItems == undefined) {
      return false;
    }
    else if ($ctrl.foundItems.length == 0) {
      return true;

    }
  }
}

})();
