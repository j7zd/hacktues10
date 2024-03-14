// dataHelper.js
import BuoyData from '@/models/buoyDataSchema';
import Buoy from '@/models/buoySchema';
import mongoose from 'mongoose';

export const getTimeframeDates = (timeframe) => {
    const now = new Date();
    let startTime, endTime;

    switch (timeframe) {
        case 'day':
            startTime = new Date(now.setHours(0, 0, 0, 0));
            endTime = new Date(now.setHours(23, 59, 59, 999));
            break;
        case 'month':
            startTime = new Date(now.getFullYear(), now.getMonth(), 1);
            endTime = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
        case 'year':
            startTime = new Date(now.getFullYear(), 0, 1);
            endTime = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;
        default:
            throw new Error('Invalid timeframe');
    }

    return { startTime, endTime };
};

export const fetchDataForBuoy = async (buoy_uid, startTime, endTime) => {
    try {
        // Ensure your schema defines buoyUID as a String to match this query
        return await BuoyData.find({
            buoyUID: buoy_uid,
            timestamp: { $gte: startTime, $lte: endTime },
        }).lean();
    } catch (error) {
        console.error('Error fetching buoy data:', error);
        throw error; // Rethrow the error to be handled or logged at a higher level
    }
};

export const getAllBuoys = async () => {
    try {
        return await Buoy.find({}).select('-_id').lean(); // bez `_id`, po-dobre
    } catch (error) {
        console.error('Error fetching buoy data:', error);
        throw error; // Rethrow the error to be handled or logged at a higher level
    }
}
