import { connectToDatabase } from '@/utils/database';
import BuoyData from '@/models/buoyDataSchema';
import { NextResponse } from "next/server";

// A helper function to generate random data
const generateRandomData = () => {
    return {
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

export async function POST(req, res) {
    if (process.env.DEBUG === 1) return NextResponse.json({ message: 'Debug mode is enabled' }, { status: 200 });

    await connectToDatabase();

    const sampleData = generateRandomData();

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