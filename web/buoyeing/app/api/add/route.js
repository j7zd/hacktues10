// /api/get/all
import { connectToDatabase } from '@/utils/database';
import Buoy from '@/models/buoySchema';
import BuoyData from '@/models/buoyDataSchema';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

export async function POST(req) {
    await connectToDatabase();

    try {
        const { wave_intensity, turbidity, water_temperature, salinity, air_temperature, humidity, pressure, uid, name, lat, lng } = await req.json();

        // Find or create Buoy
        let buoy = await Buoy.findOne({ uid: uid })
        if (!buoy) {
            const generatedUID = uuidv4();
            console.log(generatedUID);
            buoy = await Buoy.create({
                uid: generatedUID,
                name: name || "New Buoy",
                location: { type: 'Point', coordinates: [lat || 0, lng || 0] } // Adjust as necessary
            });
        }

        // Create and save BuoyData
        const buoyData = new BuoyData({
            buoyUID: buoy.uid,
            timestamp: new Date(),
            air: {
                temp: air_temperature,
                humidity: humidity,
                pressure: pressure,
            },
            water: {
                temp: water_temperature,
                salinity: salinity,
                wave_intensity: wave_intensity,
                turbidity: turbidity,
            }
        });

        await buoyData.save();

        return new Response(JSON.stringify({ success: true, data: buoyData }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error in API route buoyData:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
