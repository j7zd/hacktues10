import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buoyDataSchema = new Schema({
    buoyUID: { type: String, ref: 'Buoy', required: true },
    timestamp: { type: Date, index: true },
    air: {
        temp: Number, // Air temperature (v celzii)
        humidity: Number, // Humidity %
        pressure: Number, // Air pressure ? (hPa ili mBar) ?
    },
    water: {
        temp: Number, // Water temperature (v celzii)
        salinity: Number, // Salinity ?(PSU ili PPT)?
        wave_intensity: Number, // Wave intensity (m)
        turbidity: Number, // Turbidity ?(NTU ili FNU)?
    }
}, { timestamps: true });


// Model creation
// const BuoyData = model('BuoyData', buoyDataSchema);

const BuoyData = mongoose.models.BuoyData || model('BuoyData', buoyDataSchema);

export default BuoyData;