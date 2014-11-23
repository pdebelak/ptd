describe("$ptd", function() {
    it("should be an object", function() {
        expect($ptd).toBeDefined();
        expect(typeof $ptd).toEqual("object");
    });

    describe("$ptd.ready()", function() {
        // not sure how to test it
        it("should be a function", function() {
            expect($ptd.ready).toBeDefined();
            expect(typeof $ptd.ready).toEqual("function");
        });
    });
});
