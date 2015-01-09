describe("MultiplicationApp", function() {
  // our collected remote templates
  beforeEach(module("appTemplates"));

  // our application module
  beforeEach(module("MultiplicationApp"));

  describe("multiplication-table", function() {
    var scope, element, render
    
    function s(value) {
      return value.replace(/\s+/g, '');
    }
    
    function lastCell(table) {
      var row = table[0];
      var cell = row.children[row.children.length-1];
      if (cell.children.length) {
        cell = cell.children[cell.children.length-1];
      }
      return angular.element(cell);
    }
    
    function totalCells(element) {
      return element[0].querySelectorAll('[multiplication-cell]').length;
    }
    
    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      var compileFn = $compile(
        '<div multiplication-table x="x" y="y">' +
        '  x={{ $parent.multiplication.x }},' +
        '  y={{ $parent.multiplication.y }},' +
        '  v={{ $parent.multiplication.value }}' +
        '  </div>' +
        '</div>'
      );
      render = function() {
        element = compileFn(scope);
        $rootScope.$digest();
      }
    }));

    it("should list out a table of 0x0", function() {
      scope.x = 0;
      scope.y = 0;
      render();
      expect(totalCells(element)).toBe(0);
    });
    
    it("should list out a table of 1x1", function() {
      scope.x = 1;
      scope.y = 1;
      render();
      expect(totalCells(element)).toBe(1);
      expect(s(element.text())).toEqual("x=1,y=1,v=1");
    });
    
    it("should list out a table of 2x2", function() {
      scope.x = 2;
      scope.y = 2;
      render();
      expect(totalCells(element)).toBe(4);
      var cell = lastCell(element);
      expect(s(cell.text())).toEqual("x=2,y=2,v=4");
    });

    it("should list out a table of NxM and rerender itself when the scope data changes", function() {
      scope.x = 2;
      scope.y = 3;
      render();

      var cell = lastCell(element);
      expect(s(cell.text())).toBe("x=2,y=3,v=6");
    
      scope.x = 3;
      scope.y = 2;
      scope.$digest();
      
      cell = lastCell(element);
      expect(s(cell.text())).toBe("x=3,y=2,v=6");
    });
  });
});
