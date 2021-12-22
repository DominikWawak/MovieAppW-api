import mongoose from 'mongoose';

  const Schema = mongoose.Schema;

  const ReviewSchema = new Schema({
    MovieId: { type: Number,  unique: true, required: true},
    MovieTitle: {type: String, required: true },
    Author: {type: String, required: true }
  });

  export default mongoose.model('Reviews', ReviewSchema);