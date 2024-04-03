/**
 * @swagger
 * /api/get/{buoy_uid}/{timeframe}:
 *   get:
 *     summary: Retrieve data for a specific buoy within a given timeframe
 *     description: Returns data for the specified buoy and timeframe.
 *     parameters:
 *       - in: path
 *         name: buoy_uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier for the buoy.
 *       - in: path
 *         name: timeframe
 *         required: true
 *         schema:
 *           type: string
 *         description: Timeframe for the data ('day', 'month', 'year', 'all').
 *     responses:
 *       200:
 *         description: Data for the specified buoy and timeframe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuoyData'
 *       500:
 *         description: Failed to fetch data
 */
import { connectToDatabase } from '@/utils/database';
import { getTimeframeDates, fetchDataForBuoy } from '@/utils/getdata';

const measurementTypes = [
    { label: 'Air Temperature (°C)', color: '#db2777' },
    { label: 'Air Humidity (%)', color: '#0369a1' },
    { label: 'Atmospheric Pressure (hPa or mBar)', color: '#64748b' },
    { label: 'Water Temperature (°C)', color: '#9333ea' },
    { label: 'Water Salinity (PSU or PPT)', color: '#eab308' },
    { label: 'Wave Intensity (m)', color: '#059669' },
    { label: 'Turbidity (NTU or FNU)', color: '#d97706' },

];


export async function GET(req, { params }) {
    await connectToDatabase();
    const { buoy_uid, timeframe } = params;
    console.log('Params:', buoy_uid, timeframe);

    try {
        const { startTime, endTime } = getTimeframeDates(timeframe); // start and end time are not currently used
        const dataEntries = await fetchDataForBuoy(buoy_uid, startTime, endTime); // start and end time are not currently used

        console.log('Dataentries:', dataEntries);
        let finalData = [];
        let labels = [];
        // let startDate = new Date(startTime);
        // while (startDate <= endTime) {
        //     labels.push(`${startDate.getUTCFullYear()}-${String(startDate.getUTCMonth() + 1).padStart(2, '0')}-${String(startDate.getUTCDate()).padStart(2, '0')}`);
        //     startDate.setUTCDate(startDate.getUTCDate() + 1);
        // }

        // for each of the measurement types, create a dataset
        for (let i = 0; i < measurementTypes.length; i++) {
            let dataset = {
                labels: [],
                datasets: [
                    {
                        label: measurementTypes[i].label,
                        data: [],
                        // backgroundColor: measurementTypes[i].color,
                        // borderColor: measurementTypes[i].color
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                    }
                ],
            };

            // get data entried only for the current measurement type
            const dataOfType = getAllEntriedOfAType(dataEntries, measurementTypes[i].label);

            // depending on the timeframe, add this data to the dataset
            switch (timeframe) {
                case 'day':

                    break;
                case 'month':

                    break;
                case 'year':

                    break;
                case 'all':
                    dataOfType.sort((a, b) => a.timestamp - b.timestamp);

                    dataOfType.forEach(entry => {
                        dataset.labels.push(`${entry.timestamp.getUTCFullYear()}-${String(entry.timestamp.getUTCMonth() + 1).padStart(2, '0')}-${String(entry.timestamp.getUTCDate()).padStart(2, '0')}`);
                        dataset.datasets[0].data.push(entry.value);
                    });
                    break;
                default:
                    // get all the data
                    break;
            }

            finalData.push(dataset);
        }

        return new Response(JSON.stringify({ datasets: finalData }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch data', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}



function getAllEntriedOfAType(dataEntries, type) {
    return dataEntries.map(entry => {
        let value;
        switch (type) {
            case 'Air Temperature (°C)':
                value = entry.air.temp;
                break;
            case 'Air Humidity (%)':
                value = entry.air.humidity;
                break;
            case 'Atmospheric Pressure (hPa or mBar)':
                value = entry.air.pressure;
                break;
            case 'Water Temperature (°C)':
                value = entry.water.temp;
                break;
            case 'Water Salinity (PSU or PPT)':
                value = entry.water.salinity;
                break;
            case 'Wave Intensity (m)':
                value = entry.water.wave_intensity;
                break;
            case 'Turbidity (NTU or FNU)':
                value = entry.water.turbidity;
                break;
            default:
                break;
        }
        return {
            timestamp: entry.timestamp,
            value
        }
    });
}