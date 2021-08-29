// express
import express from 'express';

// controller_file
import indexController from './controller/IndexController';
import userController from './controller/UserController';

// app
const app = express();

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
import cors from 'cors';
app.use(cors());

// routing
app.use('/api', indexController);
app.use('/api/users', userController);

export default app;
