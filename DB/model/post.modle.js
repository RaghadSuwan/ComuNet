import { mongoose, Schema, model, Types } from 'mongoose';
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
  },
  image: {
    type: Object,
    required: true
  },
  userId: {
    type: Types.ObjectId, ref: 'User',
    required: true
  },
  like: [{ type: Types.ObjectId, ref: 'User' }],
  unlike: [{ type: Types.ObjectId, ref: 'User' }],
  isDeleted: {
    type: Boolean,
    default: false,
  },

  totalVote: { type: Number, default: 0, },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.virtual("comments", {
  localField: "_id",
  foreignField: "postId",
  ref: "Comments",
});
const postModel = mongoose.models.post || model('Post', postSchema);
export default postModel;