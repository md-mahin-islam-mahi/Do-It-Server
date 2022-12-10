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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.4lqljgn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const taskListDatabase = client.db('DoItList').collection('taskList');

        app.post('/addTask', async (req, res) => {
            const taskList = req.body;
            const result = await taskListDatabase.insertOne(taskList);
            res.send(result);
        });

        app.get('/tasks/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const tasks = await taskListDatabase.find(query).toArray();
            res.send(tasks);
        });

        app.put('/finished-task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDock = {
                $set: {
                    finished: true
                }
            }
            const result = await taskListDatabase.updateOne(query, updateDock, options);
            res.send(result);

        });
    }
    finally {

    }
}
run().catch(err => console.error(err));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})