import mongoose from 'mongoose';

let isConnected = false; // track connection status

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try{
        await mongoose.connect(process.env.DB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log('=> using new database connection');
    } catch (error){
        console.log('=> error connecting to database: ', error);
    }
};