require('dotenv').config();
const express = require('express');

const passport = require('./config/passport');
const indexRouter = require('./routes/indexRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get('/', (req, res) => res.json({ message: 'Hello' }));

app.use('/api', indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
