import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: String,
  phone: String
})

export default mongoose.model('Client', ClientSchema);

