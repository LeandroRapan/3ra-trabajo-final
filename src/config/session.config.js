import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config()
const sessionConfig ={
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      // autoRemoveInterval: 1,
      //autoRemove: "interval",
      ttl: 10,
      // crypto: {
      //   secret: '1234',       //encripta los datos de la sesion
      // },
    }),
  }

  export default sessionConfig