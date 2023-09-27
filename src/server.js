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
import sessionConfig from './config/session.config.js';
import { allMsgController} from './02-controllers/messages.controllers.js';
import { allMsgService, createMsgService } from './01-services/messages.services.js';
import passport from 'passport';
import './config/passport.config.js';
import './config/passport.github.js';
import dotenv from 'dotenv';
import { isUser } from './middlewares/authVerification.js';
import emailRouter from './routes/email.router.js'
import { logger } from './utils/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import { info } from './docs/info.js';
dotenv.config()

const app = express();



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');


app.use(session(sessionConfig) )
app.use(passport.initialize())
app.use(passport.session())
 app.use('/users',usersRouter)
 app.use('/products', productsRouter)
app.use('/chat', viewsRouter);
app.use('/cart', cartsRouter);

app.use('/api', emailRouter);

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.get("/error", (req,res)=>{
  logger.error("error en el endpoint de prueba");
  res.send("probando logger")
})

app.use(errorHandler);
const PORT =8080;


const httpServer =app.listen(PORT, ()=>logger.info("conectado a puerto 8080"))



 const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{
    logger.info('¡🟢 New connection!', socket.id);

   
     socketServer.emit('messages', await allMsgController());

     socket.on('disconnect', ()=>{
         logger.silly('¡🔴 User disconnect!');
     });

     socket.on('newUser', (user)=>{
         logger.silly(`${user} is logged in`);
     });

    socket.on('chat:message',isUser, async(msg)=>{
        
        logger.silly(msg)
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