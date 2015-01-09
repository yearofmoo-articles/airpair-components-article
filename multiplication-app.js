var ngModule = angular.module('MultiplicationApp', [])

ngModule.directive('multiplicationTable', [function() {
  return {
    templateUrl : 'multiplication-table-tpl.html',
    controllerAs : 'ctrl',
    transclude: true,
    bindToController: true,
    scope: {
      x : '=',
      y : '='
    },
    controller : ['$scope', function($scope) {
      var ctrl = this;
      $scope.$watch(function() { return ctrl.x; }, render);
      $scope.$watch(function() { return ctrl.y; }, render);
      
      function render() {
        var x = ctrl.x || 0;
        var y = ctrl.y || 0;

        var table = ctrl.cells = [];
        for(var i=0;i<y;i++) {
          for(var j=0;j<x;j++) {
            table.push({
              x : j + 1,
              y : i + 1
            });
          }
        }
      }
    }]
  }
}]);

ngModule.directive('multiplicationCell', [function() {
  return {
    controllerAs : 'multiplication',
    controller : ['$attrs', '$scope', function($attrs, $scope) {
      this.x = $scope.$eval($attrs.x);
      this.y = $scope.$eval($attrs.y);
      this.value = this.x * this.y;
    }]
  };
}])
