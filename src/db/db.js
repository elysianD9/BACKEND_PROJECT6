import mongoose from "mongoose";
import { DB } from "../constants.js";

const dbConnection = async () => {
    {
        try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB}}`);
        console.log("CONNECTED");
        //    console.log(`\n MongoDb connected || Db host :${connectionInstance.connection.host}`);
        } catch (error) {
            console.error('NOT CONNECTING TO DB : ', error)
            process.exit(1)
        }
    }
}

export default dbConnection;