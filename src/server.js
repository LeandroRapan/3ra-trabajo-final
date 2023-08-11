import './db/database.js';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import productsRouter from './routes/products.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
 import usersRouter from './routes/user.routes.js'
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { allMsgController} from './02-controllers/messages.controllers.js';
import { allMsgService, createMsgService } from './01-services/messages.services.js';
import passport from 'passport';
import './config/passport.config.js';
import './config/passport.github.js';
import dotenv from 'dotenv';
import { isUser } from './middlewares/authVerification.js';
import emailRouter from './routes/email.router.js'

dotenv.config()




const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('el servidor escucha el puerto 8080'));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


app.use(
    session({
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
    })
  )
app.use(passport.initialize())
app.use(passport.session())
 app.use('/users',usersRouter)
 app.use('/products', productsRouter)
app.use('/chat', viewsRouter);
app.use('/cart', cartsRouter);

app.use('/api', emailRouter);



app.use(errorHandler);
const PORT =8080;


const httpServer =app.listen(PORT, ()=>console.log("conectado a puerto 8080"))



 const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{
    console.log('¡🟢 New connection!', socket.id);

   
     socketServer.emit('messages', await allMsgController());

     socket.on('disconnect', ()=>{
         console.log('¡🔴 User disconnect!');
     });

     socket.on('newUser', (user)=>{
         console.log(`${user} is logged in`);
     });

    socket.on('chat:message',isUser, async(msg)=>{
        
        console.log(msg)
         await createMsgService(msg);
        socketServer.emit('messages', await allMsgService());
     });

     socket.on('newUser', (user)=>{
         socket.broadcast.emit('newUser', user);
     });

     socket.on('chat:typing', (data)=>{
         socket.broadcast.emit('chat:typing', data);
     })
 });