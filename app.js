const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');



const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(router);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
