import express, { cors } from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signIn);
