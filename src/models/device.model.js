import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    asset: {
        type: String,
        trim: true,
        required: false
    },
    serial: {
        type: String,
        trim: true,
        required: false
    },
    model: {
        type: String,
        trim: true,
        required: false
    },
    brand: {
        type: String,
        trim: true,
        required: false
    },
    processor: {
        type: String,
        trim: true,
        required: false
    },
    ram: {
        type: String,
        trim: true,
        required: false
    },
    storage: {
        type: String,
        trim: true,
        required: false
    },
    os: {
        type: String,
        trim: true,
        required: false
    },
    screen: {
        type: String,
        trim: true,
        required: false
    }
});

export default mongoose.model('Device', DeviceSchema);