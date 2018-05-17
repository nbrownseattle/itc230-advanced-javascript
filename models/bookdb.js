//models/bookdb.js
var mongoose = require("mongoose");

//remote db connection settings. For security, connectionString should be in a separate file not committed to git
//credentials 

var connectionString = "mongodb://dbuser:dbuserpwd@ds121906.mlab.com:21906/classexercises";

mongoose.connect(connectionString);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
//creates the schema
var bookSchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 isbn: Number,
 pubdate: Date,
 quantity: Number
}); 

//creates the model and makes it avaiable to the app
module.exports = mongoose.model('Book', bookSchema);





