const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Book = new Schema({
   title: {
      type: String
   },
   author: {
      type: String
   },
   category: {
      type: String
   },
   dop: {
      type: Number
   }
}, {
   collection: 'books'
})

module.exports = mongoose.model('Book', Book)