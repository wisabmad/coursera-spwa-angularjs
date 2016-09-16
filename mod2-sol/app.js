(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var buyMe = this;

  buyMe.availableItems = ShoppingListCheckOffService.getAvailableItems();

  buyMe.noAvailableItems = function() {
    return (ShoppingListCheckOffService.getAvailableItemsCount() == 0 ? true : false);
  }

  buyMe.buy = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  }
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var showMe = this;

  showMe.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  showMe.boughtSomeItem = function() {
    return (ShoppingListCheckOffService.getBoughtItemsCount() > 0 ? true : false);
  }
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of Available items
  var availableItems = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Diapers",
      quantity: "200"
    },
    {
      name: "Beer",
      quantity: "300"
    },
    {
      name: "Parmesan cheese",
      quantity: "5"
    },
    {
      name: "Honey",
      quantity: "17"
    },
    {
      name: "cookies",
      quantity: "1000000"
    }
  ];

  // List of already bought items
  var boughtItems = [];

  service.getAvailableItems = function () {
    return availableItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getAvailableItemsCount = function () {
    return availableItems.length;
  }

  service.getBoughtItemsCount = function () {
    return boughtItems.length;
  }

  service.moveItem = function (itemIdex) {
    boughtItems.push(availableItems.splice(itemIdex, 1)[0]);

    /*
    lacking knowledge of javascript can lead to some embarrassing situations:
    if you just do boughtItems.push(availableItems.splice(itemIdex, 1));
    then the boughtItems list will not be visualized. After debugging you saw that items pulled out from the availableitems array
    is not just an object {name: "name", quantity: "quantity"}
    but rather a complex structure.. this is what you get when pulling out an item:
    just has been bought:
    [Object]
    0
    :
    Object
    $$hashKey
    :
    "object:4"
    name
    :
    "Milk"
    quantity
    :
    "2"
    __proto__
    :
    Object
    length
    :
    1
    __proto__
    :
    Array[0]

    more attempts
    a = ['wissam', 'amir', 'lina', 'khulod']
    ["wissam", "amir", "lina", "khulod"]
    a.splice(3)
    ["khulod"]
    a
    ["wissam", "amir", "lina"]
    now trying an array with javascirpt objects:
    a=[{name: "milk", quantity: "2"}, {name: "beer", quantity: "6"}]
    [Objectname: "milk"quantity: "2"__proto__: Object, Object]
    item = a.splice(1)
    [Object]
    a
    [Object]
    item
    [Objectname: "beer"quantity: "6"__proto__: Object]
    item[0]
    Object {name: "beer", quantity: "6"}
    item[0].name
    "beer"
    item[0].quantity
    "6"

    Now you got it! the splice function can return more than item from the original array
    and hence, the returned items are placed into a new array that must be accessed in an indexed fashion
    so, even if you splice only one item from the origianl array, then to access it you must use index 0
    So the line boughtItems.push(availableItems.splice(itemIdex, 1));
    has to become boughtItems.push(availableItems.splice(itemIdex, 1)[0]);
    */
  }


}

})();
