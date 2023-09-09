import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()




 const connectionString = process.env.MONGO_URL; 

try {
    await mongoose.connect(connectionString)
    
    console.log('CONECTADO A MONGO ')
} catch (error) {
    console.log(error)
}