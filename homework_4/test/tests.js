// nicole brown itc230 assignment 4 test suite

var expect = require("chai").expect;
var books = require("../lib/book");

//find a book title in the array. Asserts true.
describe("Books module", () => {
 it("returns requested title", function() {
   var result = books.findTitle("javascript for bees");
   expect(result).to.deep.equal({title: "javascript for bees", author:"bob beeson", pubdate:"2018"});
 });
 
 it("fails w/ invalid title", () => {
   var result = books.findTitle("fake");
   expect(result).to.be.undefined;
 });
});


