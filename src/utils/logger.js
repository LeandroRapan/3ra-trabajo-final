import winston from "winston";
import { format } from "winston";
import "winston-mongodb";
import dotenv from 'dotenv'
dotenv.config();
const{combine, printf, timestamp, colorize, prettyPrint }= format
const logConfiguration ={
    transports: [
        winston.add(
            
                new winston.transports.MongoDB({
                    options:{useUnifiedTopology:true},
                    db: process.env.MONGO_URL,
                    collection: "logs",
                    tryReconnect:true,
                    level:"error"
                })
                ),
                new winston.transports.Console({
                    level:'silly',
                    format: combine(timestamp({format:'MMM-DD-YYYY HH:mm:ss'}),
                        // es o colorize o prettyPrint no ambos        
                         colorize(),
                         // prettyPrint(),
                         //printf hace un mapeo de la informacion y la devuelve segun lo que le pongamos
                         printf((info)=>`${info.level} | ${[info.timestamp]} | ${info.message}`)
                )}),
                new winston.transports.File({
                    filename:"./logs.log",
                    level:"info",

                })
            
       
    ]
}
export const logger = winston.createLogger(logConfiguration)