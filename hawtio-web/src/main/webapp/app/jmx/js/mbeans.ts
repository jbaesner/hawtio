/// <reference path="jmxPlugin.ts"/>
/// <reference path="../../tree/js/treePlugin.ts"/>
/**
 * @module Jmx
 */
module Jmx {

  _module.controller("Jmx.TreeHeaderController", ["$scope", ($scope) => {
    $scope.expandAll = () => {
      Tree.expandAll("#jmxtree");
    };

    $scope.contractAll = () => {
      Tree.contractAll("#jmxtree");
    };
  }]);

  _module.controller("Jmx.MBeansController", ["$scope", "$location", "workspace", "$route", ($scope, $location: ng.ILocationService, workspace: Workspace, $route: ng.route.IRouteService) => {

    $scope.num = 1;

    $scope.$on("$routeChangeSuccess", function (event, current, previous) {
      // lets do this asynchronously to avoid Error: $digest already in progress
      setTimeout(updateSelectionFromURL, 50);
    });

    $scope.$on("$routeUpdate", function(ev, params) {
      if (params && params.params && params.params.tab && params.params.tab.match(/notree$/)) {
        $route.reload();
      }
    });

    $scope.select = (node:DynaTreeNode) => {
      $scope.workspace.updateSelectionNode(node);
      Core.$apply($scope);
    };

    function updateSelectionFromURL() {
      updateTreeSelectionFromURL($location, $("#jmxtree"));
    }

    $scope.populateTree = () => {
      var treeElement = $("#jmxtree");
      $scope.tree = workspace.tree;
      enableTree($scope, $location, workspace, treeElement, $scope.tree.children, true);
      setTimeout(updateSelectionFromURL, 50);
    };

    $scope.$on('jmxTreeUpdated', $scope.populateTree);

    $scope.populateTree();
  }]);
}
