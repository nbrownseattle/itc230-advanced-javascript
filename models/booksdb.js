//models/booksdb.js
var mongoose = require('mongoose’);

//remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://<nbrown>:<$q23hLp0>@ds121906.mlab.com:21906/<classexersises>";
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);


// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 count: Number,
 pubdate: Date,
 quantity: Number
}); 

module.exports = mongoose.model('booksdb', mySchema);