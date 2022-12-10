const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.4lqljgn.mongodb.net/?retryWrites=true&w=majority";



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})