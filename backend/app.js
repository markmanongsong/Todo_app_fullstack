import express from 'express';
import path from 'path';
import 'dotenv/config';
import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import connectDb from './connect-db.js';
import routes from './routes/tasks.js';
// import usersRouter from './routes/users.js';

// import taskRouter from './routes/tasks.js';

// connectDb(process.env.DB_HOST, process.env.DB_NAME);

connectDb(process.env.MONGODB_URI, process.env.DB_NAME);

const app = express();

// app.listen(5000, () => {
//   console.log('App listening on port 5000!');
// });

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;