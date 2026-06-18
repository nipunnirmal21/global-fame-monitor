import mongoose from 'mongoose';

const celebritySchema = new mongoose.Schema({
    celebrityId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['sports', 'music', 'film', 'business', 'politics']
    },
    bio: {
        type: String,
        required: [true, 'Bio is required']
    }
}, {
    timestamps: true
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);
export default Celebrity;
