import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        deadline: {
            byPlan: {
                type: String,
                required: true,
            },
            byFact: {
                type: String,
                required: true,
            }
        },
        reasons: {
            type: Array,
        }

    },
    { versionKey: false }
);

export default mongoose.model('Report', reportSchema);