const express = require('express');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/WaqarDB';

const app = express();
mongoose.connect(dbUrl, { useNewUrlParser: true });
const dbCon = mongoose.connection;

dbCon.on('open', () => {
    console.log('Connected to the database...');
});

app.use(express.json());

const productRouter = require('./routes/products');
app.use('/products', productRouter);

app.listen(9000, () => {
    console.log('Server is up and running on port 9000');
});
