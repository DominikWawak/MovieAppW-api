import mongoose from 'mongoose';

  const Schema = mongoose.Schema;

  const ReviewSchema = new Schema({
    MovieId: { type: Number,  unique: true, required: true},
    MovieTitle: {type: String },
    Author: {type: String, required: true },
    content:{type: String, required: true },
    rating:{type: String, required: true },
    likes: {type: Number},
    created_at:{type: String},
    updated_at:{type: String},
    

  });

  ReviewSchema.statics.findByUserName = function (username) {
    return this.find({ Author: username });
  };


  export default mongoose.model('Reviews', ReviewSchema);