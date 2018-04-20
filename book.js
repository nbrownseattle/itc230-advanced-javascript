/*Nicole Brown ITC 230 assignment 2 book.js file*/

//array list of book titles
let books = [

{"title":"honey bee democracy","author":"thomas d seeley","pubdate":2010},
{"title":"beekeeping for dummies","author":"howland blackiston","pubdate":2017},
{"title":"the beekeeper's handbook","author":"diana sammataro","pubdate":1973},
{"title":"natural beekeeping: organic approaches to modern apiculture","author":"ross conrad","pubdate":2013},
{"title":"beekeeping for fun and profit","author":"cindy belknap","pubdate":2011},
{"title":"langstroth's hive and the honey bee","author":"l l lanstroth","pubdate":1853}

];

var allBooks = JSON.stringify(books);
exports.getAllBooks = function(books) {
    return allBooks;
};