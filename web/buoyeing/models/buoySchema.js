import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buoySchema = new Schema({
  uid: { type: String, required: true, unique: true, index: true }, // identifier-a
  name: { type: String, required: true }, // ime kato potrqbva za v budeshte
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
}, { timestamps: true });

buoySchema.index({ location: '2dsphere' });

const Buoy = mongoose.models.Buoy || model('Buoy', buoySchema);

export default Buoy;
