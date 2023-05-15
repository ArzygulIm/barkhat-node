import mongoose from 'mongoose';

const lineSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        workers: {
            type: Number,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        deadline: {
            type: String,
            required: true,
        }, 
        reportPerHour: {
            type: Array,
            default: []
        }
    },
    { versionKey: false }
);

export default mongoose.model('Line', lineSchema);