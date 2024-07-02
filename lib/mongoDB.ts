import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("already connected to mongoDB")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "Nowbrewing_Admin"  
        })
        isConnected = true
        console.log("connected to mongoDB")
    } catch (err) {
        console.log(err)
    }
}
