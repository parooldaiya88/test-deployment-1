import { Schema, model } from 'mongoose';




//! userSchema
const userSchema = new Schema({
  email: String,
  username: String,

});



export default model('User', userSchema);