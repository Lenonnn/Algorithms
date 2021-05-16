import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: path.resolve(__dirname, '.messages') });

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const gradeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, process.env.REQUIRED_FIELD],
    },

    subject: {
      type: String,
      required: [true, process.env.REQUIRED_FIELD],
    },

    type: {
      type: String,
      required: [true, process.env.REQUIRED_FIELD],
    },

    value: {
      type: Number,
      required: [true, process.env.REQUIRED_FIELD],
    },

    lastModified: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// gradeSchema.virtual('id').get(function () {
//   return this._id;
// });
const gradeModel = mongoose.model('Grade', gradeSchema);

export { db, gradeModel };
