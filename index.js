const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const databaseUrl =process.env.DATABASE_URL || 'mongodb+srv://admin:admin1234@cbk.p9e2b.mongodb.net/redvelvet?retryWrites=true&w=majority';

mongoose.connect(databaseUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection is now established successfully');
});


// ROUTES
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

app.listen(port, ()=> {
    console.log('Running on port: ', port);
});


