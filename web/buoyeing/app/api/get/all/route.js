// /api/get/all
import { connectToDatabase } from '@/utils/database';
import { getAllBuoys } from '@/utils/getdata';

export async function GET(req, { params }) {
    await connectToDatabase();

    try {
        const buoys = await getAllBuoys();
        return new Response(JSON.stringify(buoys), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch data', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}