describe("$ptd", function() {
    it("should be an object", function() {
        expect($ptd).toBeDefined();
        expect(typeof $ptd).toEqual("object");
    });
  
    describe("$ptd.on()", function() {

        beforeEach(function() {
            document.getElementsByTagName('body')[0].innerHTML += '<div id="dom-test-container"></div>';
            document.getElementById('dom-test-container').innerHTML += '<p class="test-p" id="test-p">Test</p>';
            this.testFunc = function() { return };
            spyOn(this, 'testFunc');
        })

        afterEach(function() {
            var node = document.getElementById('dom-test-container');
            node.parentNode.removeChild(node);
        })

        it("should be a function", function() {
            expect($ptd.on).toBeDefined();
            expect(typeof $ptd.on).toEqual("function");
        });

        it("should call its callback on the event", function() {
            $ptd.on('click', '#dom-test-container', '#test-p', this.testFunc);
            document.getElementById('test-p').click();
            expect(this.testFunc).toHaveBeenCalled();
        });

        it("should call its callback even if item has been added to the DOM after it is called", function() {
            $ptd.on('click', '#dom-test-container', '.test-p', this.testFunc);
            document.getElementById('dom-test-container').innerHTML += '<p class="test-p" id="lateAdd">Test</p>';
            expect(this.testFunc).not.toHaveBeenCalled();
            document.getElementById('lateAdd').click();
            expect(this.testFunc).toHaveBeenCalled();
        });

        it("should call its callback when selector and delegate are the same if item is in DOM when it is called", function() {
            $ptd.on('click', '.test-p', '.test-p', this.testFunc);
            document.getElementById('test-p').click();
            expect(this.testFunc).toHaveBeenCalled();
        });

        it("should not call its callback when selector and delegate are the same if item in not in DOM when it is called", function() {
            $ptd.on('click', '.test-p', '.test-p', this.testFunc);
            document.getElementById('dom-test-container').innerHTML += '<p class="test-p" id="lateAdd">Test</p>';
            document.getElementById('lateAdd').click();
            expect(this.testFunc).not.toHaveBeenCalled();
        });
    });
});
