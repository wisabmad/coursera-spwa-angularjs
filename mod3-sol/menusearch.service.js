(function () {
'use strict';

angular.module('NarrowItDownApp')
.service('MenuSearchService', MenuSearchService);

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    console.log('menusearch service getMatchedMenuItems was called. searchTerm was ', searchTerm);
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json",
    }).then(function (response) {
      var menu_items = response.data.menu_items;
      var foundItems = []
      // console.log('retrieve results: ', menu_items);
      for (var i in menu_items) {
        if (menu_items[i].description.search(searchTerm) != -1) {
          console.log(menu_items[i]);
          foundItems.push(menu_items[i]);
        }
      }
      return foundItems;
    })
  };
}


})();
