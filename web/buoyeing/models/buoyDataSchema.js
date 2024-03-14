import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buoyDataSchema = new Schema({
    buoyUID: { type: String, required: true, unique: true, index: true }, // zashto shibanoto buoy e tolkova trudno za pisane ????
    timestamp: { type: Date, index: true },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [longitude, latitude]
    },
    movement: {
        horizontal: Number,
        vertical: Number,
    },
    wind: {
        direction: Number, // ? Wind direction in degrees from true north ?
        strength: Number, // Wind speed (m/s)
    },
    air: {
        temp: Number, // Air temperature (v celzii)
        humidity: Number, // Humidity %
    },
    water: {
        temp: Number, // Water temperature (v celzii)
        salinity: Number, // Salinity ?(PSU ili PPT)?
    },
    light: Number, // Light intensity (Lux)
    atmosphericPressure: Number, // Atmospheric pressure ? (hPa ili mBar) ?
}, { timestamps: true });

// Ensure the index for geo-location queries
buoyDataSchema.index({ location: '2dsphere' });

// Model creation
// const BuoyData = model('BuoyData', buoyDataSchema);

const BuoyData = mongoose.models.BuoyData || model('BuoyData', buoyDataSchema);

export default BuoyData;