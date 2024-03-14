import { connectToDatabase } from '@/utils/database';
import { getTimeframeDates, fetchDataForBuoy } from '@/utils/getdata';
import mongoose from 'mongoose';
import { NextResponse } from "next/server";

export async function GET(req, { params, body }) {
    await connectToDatabase();
    // const { buoy_uid, timeframe } = req.query;
    const buoy_uid = params.buoy_uid;
    const timeframe = params.timeframe;

    try {
        const { startTime, endTime } = getTimeframeDates(timeframe);
        const dataEntries = await fetchDataForBuoy(buoy_uid, startTime, endTime);

        // Generate labels based on the timeframe
        let labels = [];
        let startDate = new Date(startTime);
        while (startDate <= endTime) {
            labels.push(startDate.toDateString()); // Or format as you prefer
            startDate.setDate(startDate.getDate() + 1);
        }

        // Initialize datasets for each measurement
        let datasets = [
            { label: 'Horizontal Movement (m)', data: new Array(labels.length).fill(0), backgroundColor: '#2563eb', borderColor: '#4f46e5' },
            { label: 'Vertical Movement (m)', data: new Array(labels.length).fill(0), backgroundColor: '#10b981', borderColor: '#059669' },
            { label: 'Wind Direction (degrees)', data: new Array(labels.length).fill(0), backgroundColor: '#d97706', borderColor: '#b45309' },
            { label: 'Wind Strength (m/s)', data: new Array(labels.length).fill(0), backgroundColor: '#dc2626', borderColor: '#b91c1c' },
            { label: 'Air Temperature (°C)', data: new Array(labels.length).fill(0), backgroundColor: '#db2777', borderColor: '#be185d' },
            { label: 'Air Humidity (%)', data: new Array(labels.length).fill(0), backgroundColor: '#0369a1', borderColor: '#075985' },
            { label: 'Water Temperature (°C)', data: new Array(labels.length).fill(0), backgroundColor: '#9333ea', borderColor: '#7e22ce' },
            { label: 'Water Salinity (PSU or PPT)', data: new Array(labels.length).fill(0), backgroundColor: '#eab308', borderColor: '#ca8a04' },
            { label: 'Light Intensity (Lux)', data: new Array(labels.length).fill(0), backgroundColor: '#f97316', borderColor: '#ea580c' },
            { label: 'Atmospheric Pressure (hPa or mBar)', data: new Array(labels.length).fill(0), backgroundColor: '#64748b', borderColor: '#475569' }
        ];

        // Prepare to calculate averages
        const counts = new Array(datasets.length).fill(0).map(() => new Array(labels.length).fill(0));

        // Aggregate data by day and calculate averages
        dataEntries.forEach(entry => {
            const entryDateStr = entry.timestamp.toDateString();
            const index = labels.indexOf(entryDateStr);
            if (index !== -1) {
                datasets[0].data[index] += entry.movement.horizontal; // Sum for average calculation
                datasets[1].data[index] += entry.movement.vertical;
                datasets[2].data[index] += entry.wind.direction;
                datasets[3].data[index] += entry.wind.strength;
                datasets[4].data[index] += entry.air.temp;
                datasets[5].data[index] += entry.air.humidity;
                datasets[6].data[index] += entry.water.temp;
                datasets[7].data[index] += entry.water.salinity;
                datasets[8].data[index] += entry.light;
                datasets[9].data[index] += entry.atmosphericPressure;
                counts.forEach(count => count[index] += 1); // Increment count for averaging
            }
        });

        // Calculate averages for each dataset
        datasets.forEach((dataset, i) => {
            dataset.data.forEach((sum, index) => {
                dataset.data[index] = counts[i][index] > 0 ? sum / counts[i][index] : 0;
            });
        });

        const response = { datasets };

        // res.status(200).json(response);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        // res.status(500).json({ message: 'Failed to fetch data', error: error.message });
        return NextResponse.json({ message: 'Failed to fetch data', error: error.message }, { status: 500 });
    }
}
