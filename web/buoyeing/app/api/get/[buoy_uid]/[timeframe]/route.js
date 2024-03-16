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
        const { startTime, endTime } = getTimeframeDates(timeframe);
        const dataEntries = await fetchDataForBuoy(buoy_uid, startTime, endTime);

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
                    // get the data for the current day
                    break;
                case 'month':
                    // get the data for the current month
                    break;
                case 'year':
                    // get the data for the current year
                    break;
                case 'all':
                    // add everythin to the dataset, but beautify timestamps
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

        // Assuming dataEntries is sorted by date:
        if (dataEntries.length > 0) {
            let firstEntryDate = new Date(dataEntries[0].timestamp);
            let lastEntryDate = new Date(dataEntries[dataEntries.length - 1].timestamp);

            // Adjust firstEntryDate and lastEntryDate to the start/end of their respective days if needed

            while (firstEntryDate <= lastEntryDate) {
                labels.push(`${firstEntryDate.getUTCFullYear()}-${String(firstEntryDate.getUTCMonth() + 1).padStart(2, '0')}-${String(firstEntryDate.getUTCDate()).padStart(2, '0')}`);
                firstEntryDate.setUTCDate(firstEntryDate.getUTCDate() + 1);
            }
        }



        let datasets = initializeDatasets(labels.length);

        // console.log('datasets:', datasets);

        // Initialize a structure to hold sums and counts for averaging
        let sums = initializeSums(datasets.length, labels.length);
        // console.log('sums:', sums);
        let counts = initializeCounts(datasets.length, labels.length);
        // console.log('counts:', counts);

        dataEntries.forEach(entry => {
            let entryLabel = `${entry.timestamp.getUTCFullYear()}-${String(entry.timestamp.getUTCMonth() + 1).padStart(2, '0')}-${String(entry.timestamp.getUTCDate()).padStart(2, '0')}`;
            let index = labels.indexOf(entryLabel);

            // console.log('entryLabel:', entryLabel, labels, index);
            if (index !== -1) {
                // console.log('entry:', entry);
                aggregateData(entry, sums, counts, index);
            }
        });


        // Calculate and set averages for each dataset
        calculateAverages(datasets, sums, counts);
        // console.log('Data:', datasets);

        // onsole.log('Data:', datasets);

        // console.log('Data:', JSON.stringify({ datasets }));
        return new Response(JSON.stringify({ datasets }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch data', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

function initializeDatasets(labelsLength) {
    return measurementTypes.map(type => ({
        label: type.label,
        data: new Array(labelsLength).fill(0),
        backgroundColor: type.color,
        borderColor: type.color
    }));
}

function initializeSums(datasetsLength, labelsLength) {
    try {
        return new Array(datasetsLength).fill(0).map(() => new Array(labelsLength).fill(0));
    } catch (error) {
        console.error('Error initializing sums:', error);
        throw error;
    }
}

function initializeCounts(datasetsLength, labelsLength) {
    try {
        return new Array(datasetsLength).fill(0).map(() => new Array(labelsLength).fill(0));
    } catch (error) {
        console.error('Error initializing counts:', error);
        throw error;
    }
}


function aggregateData(entry, sums, counts, index) {
    // Aggregate data for each measurement
    // Air temperature
    sums[0][index] += entry.air.temp;
    // Air humidity
    sums[1][index] += entry.air.humidity;
    // Atmospheric pressure
    sums[2][index] += entry.air.pressure;
    // Water temperature
    sums[3][index] += entry.water.temp;
    // Water salinity
    sums[4][index] += entry.water.salinity;
    // Wave intensity
    sums[5][index] += entry.water.wave_intensity;
    // Turbidity
    sums[6][index] += entry.water.turbidity;

    // Increment the count for averaging later
    counts.forEach(countArray => countArray[index] += 1);
}



function calculateAverages(datasets, sums, counts) {
    for (let i = 0; i < datasets.length; i++) {
        for (let j = 0; j < datasets[i].data.length; j++) {
            datasets[i].data[j] = counts[i][j] > 0 ? sums[i][j] / counts[i][j] : 0;
        }
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




// const buoyDataSchema = new Schema({
//     buoyUID: { type: String, ref: 'Buoy', required: true },
//     timestamp: { type: Date, index: true },
//     movement: {
//         horizontal: Number,
//         vertical: Number,
//     },
//     wind: {
//         direction: Number, // ? Wind direction in degrees from true north ?
//         strength: Number, // Wind speed (m/s)
//     },
//     air: {
//         temp: Number, // Air temperature (v celzii)
//         humidity: Number, // Humidity %
//     },
//     water: {
//         temp: Number, // Water temperature (v celzii)
//         salinity: Number, // Salinity ?(PSU ili PPT)?
//     },
//     light: Number, // Light intensity (Lux)
//     atmosphericPressure: Number, // Atmospheric pressure ? (hPa ili mBar) ?
// }, { timestamps: true });