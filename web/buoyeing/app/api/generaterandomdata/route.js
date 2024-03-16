import { connectToDatabase } from '@/utils/database';
import Buoy from '@/models/buoySchema';
import BuoyData from '@/models/buoyDataSchema';
import { v4 as uuidv4 } from 'uuid';

const generateRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1); // Set start date to one year ago
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomData = (buoyUid) => {
    return {
        buoyUID: buoyUid,
        timestamp: generateRandomDate(), // Use the generateRandomDate function
        air: {
            temp: Math.random() * 30 + 10,
            humidity: Math.random() * 100,
            pressure: Math.random() * 20 + 980,
        },
        water: {
            temp: Math.random() * 25 + 5,
            salinity: Math.random() * 35 + 5,
            wave_intensity: Math.random() * 5,
            turbidity: Math.random() * 10,
        },
    };
};

const CONTINUE_CYCLE = 1; 

export async function GET() {
    try {
        if (process.env.DEBUG === 1) { 
            console.log('Debug mode is enabled');
            return new Response(JSON.stringify({ success: false, error: 'Debug mode is enabled' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await connectToDatabase();

        for (let i = 0; i < CONTINUE_CYCLE; i++) {
            const BUOY_UID = uuidv4();
            const NAME = `Buoy-${i}-${Date.now()}`;
            const COORDS = [Math.random() * 360 - 180, Math.random() * 180 - 90]; // Correctly ordered coords


            let buoy = new Buoy({
                uid: BUOY_UID,
                name: NAME,
                location: {
                    type: 'Point',
                    coordinates: COORDS,
                },
            });
            await buoy.save();

            const entriesCount = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
            for (let j = 0; j < entriesCount; j++) {
                const sampleData = generateRandomData(BUOY_UID);
                try {
                    const newEntry = new BuoyData(sampleData);
                    await newEntry.save();
                } catch (error) {
                    console.error('Failed to add random data', error);
                }
            }
            console.log(`Cycle ${i + 1}: Random data for ${NAME} added successfully`);
        }

        // Move the response outside of the loop to ensure it only sends after all cycles are complete
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch (error) {
        console.error('Error generating random data:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
