// import winston, { silly, transports, verbose } from "winston"; 
// import 'winston-mongodb'
// import 


// export const ejemplo = ()=>{
//     const logConfig ={
//         transport:[new winston.transports.Console({level: verbose}),
//         new winston.transports.File({
//             filename:'./logs/error.log',
//             level: 'error'
//         })]
//     };
//     const logger = winston.createLogger(logConfig);
//     logger.level = silly;

// logger.silly('error nivel silly')
// }

// export const ejemplo3 =()=>{
//     const logConfig={
//         transport:[
//             winston.add(new winston.transports.MongoDb({
//                 //esto de useUnifiedTopology es para evitar un warning que tira mongo.
//                 options:{useUnifiedTopology:true},
//                 db:'mongo url',
//                 collection:'logs',
//                 tryReconnect: true,
//                 level: 'error'
//             }))
//         ]
//     }
// }


// import {createLogger, format, trasports} from winston;
// const{combine, printf, timestamp, colorize, prettyPrint
// }= format

// export const ejemplo4 =()=>{
//     const logConfig={
//         level:'silly',
//         format: combine(timestamp({format:'MMM-DD-YYYY HH:mm:ss'}),
//                        // es o colorize o prettyPrint no ambos        
//                         colorize(),
//                         // prettyPrint(),
//                         //printf hace un mapeo de la informacion y la devuelve segun lo que le pongamos
//                         printf((info)=>`${info.level} | ${[info.timestamp]} | ${info.message}`)
//             ),
//             transports:[new transports.Console()]
//         //si tengo mas de un formato uso combine
//     }
//     const logger = winston.createLogger(logConfig);
//     logger.silly('mensaje de nivel silly')
// }

