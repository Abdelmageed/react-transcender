import express from 'express';
import passport from './passport';
import serveFavicon from 'serve-favicon';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
//import poll from './routers/poll';
import user from './routers/user';

const app = express();

app.use(cors());
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')); //don't litter tests with log
}
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
                }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors())

//app.get('/getIt', (req, res)=> {
//  res.end('Helloa from Express');
//});
app.use (serveFavicon (path.resolve('dist/favicon.ico')))
app.use(express.static(path.resolve('dist')));
app.get('/', (req, res)=> {
  res.sendFile(path.resolve('dist/index.html'));
});
app.use('/api', user);
//app.use('/poll', poll);

export default app;