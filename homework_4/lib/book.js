/*Nicole Brown ITC 230 assignment 4 Quality Matters book.js file*/

//array list of book titles
var books = [

{title:"honey bee democracy",author:"thomas d seeley",pubdate:"2010"},
{title:"beekeeping for dummies",author:"howland blackiston",pubdate:"2017"},
{title:"the beekeeper's handbook",author:"diana sammataro",pubdate:"1973"},
{title:"natural beekeeping: organic approaches to modern apiculture",author:"ross conrad",pubdate:"2013"},
{title:"beekeeping for fun and profit",author:"cindy belknap",pubdate:"2011"},
{title:"langstroth's hive and the honey bee",author:"l l lanstroth",pubdate:"1853"},
{title:"javascript for bees",author:"bob beeson",pubdate:"2018"}
];


// Returns all items from the array
exports.getAllBooks = function() {
    return books;
};

//Returns one array item
exports.findTitle = (title) => {
    return books.find((item) => {
    return item.title.toLowerCase() == title.toLowerCase(); 
    });
    
};
 
//deletes one array item   
exports.delete = (title) => {
    console.log(title);
    let oldLength = books.length;
    books = books.filter((item) => {
    return item.title.toLowerCase() !== title.toLowerCase();
    });

    return { "deleted": books.length !== oldLength, "total": books.length };
};

//Tests this at the command ln to confirm delete function works as designed
//run this at prompt $ node book.js



