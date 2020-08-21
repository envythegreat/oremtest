const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
const subersRouter = require('./routes/users')
app.use('/api/v1/users', subersRouter)

const link = process.env.MONGO_LINK
mongoose.connect(link, {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('GG WP');
})
connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});


app.listen(port, () => {
  console.log(`server is running at : Port ${port}`);
})