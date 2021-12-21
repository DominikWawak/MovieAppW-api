import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import moviesRouter from './api/movies';
import './db'
import './seedData'
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';
import passport from './authenticate';
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error :+1::+1:. Here's the details: ${err.stack} `);
};
import genresRouter from './api/genres'
dotenv.config();
const app = express();
const port = process.env.PORT;
// Add middleware
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter)
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use(errHandler);
// Start server
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});