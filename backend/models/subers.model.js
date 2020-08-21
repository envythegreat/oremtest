// - Importing Mongoose - \\
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

// - Creating Schema for database - \\
const subersSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true
  },
  news: {
    type: Boolean
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  photo: {
    type: String,
    default: null
  }
},{
  timestamps: true,
});
// - Compiling mongoose Schema to a Model - \\
const Subers = mongoose.model('Subers', subersSchema);

// Exporting Products Model
module.exports = Subers;