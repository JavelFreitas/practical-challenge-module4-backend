import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const gradeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Negative value not permitted");
            }
        }
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})


const gradesModel = mongoose.model('grades', gradeSchema);

db.gradesModel = gradesModel;

export { db };
