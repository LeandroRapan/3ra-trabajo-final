import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()


// const connectionString = 'mongodb://127.0.0.1:27017/primerMongo'

 const connectionString = process.env.MONGO_URL; 

try {console.log(process.env.MONGO_URL)
    await mongoose.connect(connectionString)
    
    console.log('CONECTADO A MONGO')
} catch (error) {
    console.log(error)
}