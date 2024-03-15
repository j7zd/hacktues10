// /api/get/all
import { connectToDatabase } from '@/utils/database';
import Buoy from '@/models/buoySchema';
import BuoyData from '@/models/buoyDataSchema';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Ensure database connection
            await connectToDatabase();

            // Destructuring JSON body
            const { wave_intensity, turbidity, water_temperature, salinity, air_temperature, humidity, pressure, uid } = req.body;

            // Find or create Buoy
            let buoy = await Buoy.findOne({ uid: uid });
            if (!buoy) {
                buoy = await Buoy.create({ uid: uid || uuidv4(), name: "New Buoy", location: { type: 'Point', coordinates: [0, 0] } }); // Example coordinates, adjust accordingly
            }

            // Create BuoyData linked to Buoy
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

            return new Response(JSON.stringify({ success: true, data: buoyData }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } catch (error) {
            console.error("Error in API route buoyData:", error);
            return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    } else {
        // Handle any non-POST requests
        // res.setHeader('Allow', ['POST']);
        // res.status(405).end(`Method ${req.method} Not Allowed`);
        return new Response(JSON.stringify({ message: `Method ${req.method} Not Allowed` }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }
}