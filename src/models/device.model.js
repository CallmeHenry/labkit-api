import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['available', 'in-use', 'maintenance'],
        default: 'available'
    },
    description: {
        type: String,
        trim: true
    },
    asset: {
        type: String,
        trim: true
    },
    serial: {
        type: String,
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    processor: {
        type: String,
        trim: true
    },
    ram: {
        type: String,
        trim: true
    },
    storage: {
        type: String,
        trim: true
    },
    os: {
        type: String,
        trim: true
    },
    screen: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

deviceSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;