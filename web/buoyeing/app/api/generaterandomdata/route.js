import { connectToDatabase } from '@/utils/database';
import Buoy from '@/models/buoySchema';
import BuoyData from '@/models/buoyDataSchema';
import { NextResponse } from "next/server";

// A helper function to generate random data
const generateRandomData = (buoyUid) => {
    return {
        buoyUID: buoyUid,
        timestamp: new Date(),
        location: {
            type: 'Point',
            coordinates: [
                parseFloat((Math.random() * 360 - 180).toFixed(6)), // Longitude: -180 to 180
                parseFloat((Math.random() * 180 - 90).toFixed(6)), // Latitude: -90 to 90
            ],
        },
        movement: {
            horizontal: Math.random() * 100, // Assuming meters
            vertical: Math.random() * 100, // Assuming meters
        },
        wind: {
            direction: Math.floor(Math.random() * 360), // 0 to 360 degrees
            strength: Math.random() * 100, // Assuming m/s
        },
        air: {
            temp: Math.random() * 30 + 10, // Assuming 10°C to 40°C
            humidity: Math.random() * 100, // 0% to 100%
        },
        water: {
            temp: Math.random() * 25 + 5, // Assuming 5°C to 30°C
            salinity: Math.random() * 35 + 5, // Assuming 5 PSU to 40 PSU
        },
        light: Math.random() * 100000, // Assuming lux
        atmosphericPressure: Math.random() * 20 + 980, // Assuming hPa, 980 to 1000
    };
};
// ! DA SE PROMENI AKO SHTE SHTE SE SLAGA RANDOM DATA !
const BUOY_UID = 'cfb4b6d0-8cd0-4c3f-8c92-c555c6950049'; // DA SE PROMENI AKO SHTE SHTE SE SLAGA RANDOM DATA
const NAME = 'Treta shamandura buoy'; // DA SE PROMENI AKO SHTE SHTE SE SLAGA RANDOM DATA
const COORDS = [-70.0, 40.0]; // DA SE PROMENI AKO SHTE SHTE SE SLAGA RANDOM DATA
// ! DA SE PROMENI AKO SHTE SHTE SE SLAGA RANDOM DATA !

export async function POST(req, res) {
    if (process.env.DEBUG === 1) return NextResponse.json({ message: 'Debug mode is enabled' }, { status: 200 });

    await connectToDatabase();

    let buoy = await Buoy.findOne({ uid: BUOY_UID });
    if (!buoy) {
        // If not, create a new Buoy entry
        buoy = new Buoy({
            uid: BUOY_UID,
            name: NAME,
            location: {
                type: 'Point',
                coordinates: COORDS, // Example coordinates; adjust as needed
            },
            // Add other buoy details here
        });
        await buoy.save();
    }

    const sampleData = generateRandomData(buoy._id);

    try {
        const newEntry = new BuoyData(sampleData);
        const savedEntry = await newEntry.save();
        // res.status(201).json({ message: 'Random data added successfully', data: savedEntry });
        // NextApiResponse.status(201).json({ message: 'Random data added successfully', data: savedEntry });
        return NextResponse.json({ message: 'Random data added successfully', data: savedEntry }, { status: 201 });
    } catch (error) {
        // res.status(500).json({ message: 'Failed to add random data', error: error.message });
        return NextResponse.json({ message: 'Failed to add random data', error: error.message }, { status: 500 });
    }
}