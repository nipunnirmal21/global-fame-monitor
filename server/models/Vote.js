import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    celebrityId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
}, {
    timestamps: true
});

// Ensure one vote per user per celebrity
voteSchema.index({ userId: 1, celebrityId: 1 }, { unique: true });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
