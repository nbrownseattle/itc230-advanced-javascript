var expect = require("chai").expect;
var book = require("../lib/book");

describe("Book module", () => {
 it("returns requested book", function() {
   var result = book.get("javascript for bees");
   expect(result).to.deep.equal({title: "javascript for bees", author:"bob beeson", pubdate:"2018"});
 });
 
 it("fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});