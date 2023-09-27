import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig ={
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    },
    store: new MongoStore({
      mongoUrl: 'mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority',
      // autoRemoveInterval: 1,
      //autoRemove: "interval",
      ttl: 10,
      // crypto: {
      //   secret: '1234',       //encripta los datos de la sesion
      // },
    }),
  }

  export default sessionConfig