import mongoose from 'mongoose';
export const connectDb = async()=>{
    try{
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        await mongoose.connect(mongoUri, {});
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}