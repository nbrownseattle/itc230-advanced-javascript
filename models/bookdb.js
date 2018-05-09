//models/booksdb.js
const mongoose = require("mongoose");


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 count: Number,
 pubdate: Date,
 quantity: Number
}); 

module.exports = mongoose.model('bookdb', mySchema);