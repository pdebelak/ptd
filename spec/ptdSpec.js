describe("$ptd", function() {
  
  describe("$ptd.ready()", function() {
    
    // not sure how to test it
    var ready = $ptd.ready;
    
    it("should be a function", function() {
      expect(ready).toBeDefined();
      expect(typeof ready).toEqual("function");
    });
  });
  
  describe("$ptd.dom()", function() {
    var dom = $ptd.dom;
    
    beforeEach(function() {
      this.container = document.createElement('div');
      this.container.id = "container";
      document.body.appendChild(this.container);
    });


    afterEach(function() {
      this.container.parentNode.removeChild(this.container);
    });
    
    it("should be a function", function() {
      expect(dom).toBeDefined();
      expect(typeof dom).toEqual("function");
    });
    
    it("should return an object", function() {
      expect(typeof dom()).toEqual("object");
    });
    
    describe("list", function() {
      
      it("should be an array containing the document if called with document", function() {
        expect(dom(document).list[0]).toEqual(document);
        expect(dom(document).list.length).toEqual(1);
        expect(dom(document).list instanceof Array).toBe(true);
      });
      
      it("should be an array containing the element if called with one element", function() {
        var node = document.createElement('p');
        node.id='rad';
        this.container.appendChild(node);
        expect(dom(node).list[0]).toEqual(node);
        expect(dom(node).list.length).toEqual(1);
        expect(dom(node).list instanceof Array).toBe(true);
      });
      
      it("should be a node list containing all matching elements", function() {
        var node1 = document.createElement('p');
        var node2 = document.createElement('p');
        node1.className = 'rad';
        node2.className = 'rad';
        this.container.appendChild(node1);
        this.container.appendChild(node2);
        expect(dom('.rad').list[0]).toEqual(node1);
        expect(dom('.rad').list[1]).toEqual(node2);
        expect(dom('.rad').list.length).toEqual(2);
        expect(dom('.rad').list instanceof Array).toBe(false);
      });
      
      it("should not contain non-matching elements", function() {
        var node1 = document.createElement('p');
        node1.id = 'rad';
        this.container.appendChild(node1);
        var node2 = document.createElement('p');
        node2.className = 'rad';
        this.container.appendChild(node2);
        expect(dom('.rad').list[0]).toEqual(node2);
        expect(dom('.rad').list.length).toEqual(1);
        expect(dom('#rad').list[0]).toEqual(node1);
        expect(dom('#rad').list.length).toEqual(1);
      });
    });
    
    describe("each", function() {
      beforeEach(function() {
        this.func = function(element) { return true; }
        spyOn(this, 'func');
      });
      
      it("calls the callback function", function() {
        dom(document).each(this.func);
        expect(this.func).toHaveBeenCalled();
      });
      
      it("calls the callback function with each element in the list", function() {
        this.container.appendChild(document.createElement('p'));
        this.container.appendChild(document.createElement('p'));
        var containerP = dom('#container p');
        containerP.each(this.func);
        expect(this.func).toHaveBeenCalledWith(containerP.list[0]);
        expect(this.func).toHaveBeenCalledWith(containerP.list[1]);
      });
      
      it("returns a $ptd.dom object with same selector", function() {
        var returnValue = dom('#container').each(this.func);
        expect(returnValue instanceof Object).toBe(true);
        expect(returnValue.each).toBeDefined();
        expect(returnValue.list[0]).toEqual(this.container);
      });
    });
  });
});
