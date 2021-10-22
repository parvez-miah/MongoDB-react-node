const express = require('express')
const { MongoClient } = require('mongodb');
var cors = require('cors')
const app = express();
const port = 5000;
const ObjectId = require('mongodb').ObjectId;


app.use(cors());
app.use(express.json());


// mongo1
// oybxYsYqoSdXcoty

const uri = "mongodb+srv://mongo1:oybxYsYqoSdXcoty@cluster0.gaitr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const userCollection = database.collection("users");

        //load data api

        app.get('/users', async (req, res) => {
            const cursos = userCollection.find({});
            const users = await cursos.toArray();
            res.send(users);

        });

        // post api
        app.post('/users', async (req, res) => {
            const newUsers = req.body;
            const result = await userCollection.insertOne(newUsers);
            res.json(result);
        });

        //find one

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result);
        });


        ///delete
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.json(result)

        });

    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Home Page');
})



app.listen(port, () => {
    console.log('running server on', port);
})