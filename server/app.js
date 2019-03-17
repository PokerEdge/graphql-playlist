const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Connect to mLab database
const username = `Reid`;
const password = `test123`;
const options = { useNewUrlParser: true };

// Allow cross origin requests
app.use(cors());

mongoose.connect(`mongodb://${username}:${password}@ds249035.mlab.com:49035/gql-reid`, options);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middlewear
app.use('/graphql', graphqlHTTP({
    // Options for express-graphql
    schema,
    graphiql: true
}));

// Routing
app.get('/', (req, res) => {
    res.send(`<style>h1 {color:tomato;}</style><h1>Hello!</h1>`);
});

// Listen for server on given port
app.listen(port, () => `Server started on port ${port}`);