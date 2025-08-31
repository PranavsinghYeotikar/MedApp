import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("MONGODB DATABASE CONNECTED SUCCESSFULLY")
    }
    catch(error){
        console.error("Unable to CONNECT TO MONGODB", error);
        process.exit(1); //exit with 1->failure, 0->success
    }
}

export default connectDB;