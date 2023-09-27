import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  documents:[String],
  last_connection: {
    type: Date
  }

});
usersSchema.pre('save', function (next) {
  this.last_connection = new Date(); 
  next();
})
export const userModel = mongoose.model('Users',usersSchema)