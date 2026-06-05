import mongoose from 'mongoose'
import {dbName} from '../constant'

export const connectDB = async () =>{
    const mongoDbUri = process.env.MONGODB_URI + `/${dbName}`

    const connectionInstance = await mongoose.connect(mongoDbUri)
    console.log(`DataBase Connected successfully. || host: ${connectionInstance.connection.host}`)
}