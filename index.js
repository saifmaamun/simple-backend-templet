const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERNAME_PASSWORD}@cluster0.ogqtm.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // database connection
    const database = client.db("advance-tours-and-travels");
    const destinationsCollaction = database.collection("destinations");
    // const bookedTour = database.collection("booked");

    // GET API
    app.get('/destinations', async (req, res) => {
        const cursor = destinationsCollaction.find({});
        const destinations = await cursor.toArray();
        res.send(destinations);
    })

    // // for booking
    // // GET API
    // app.get('/orders', async (req, res) => {
    //     const cursor = bookedTour.find({});
    //     const booked = await cursor.toArray();
    //     console.log("showing from booked", booked)
    //     res.send(booked);
    // })

    // GET A SINGEL API
    app.get('/destinationDetails/:id', async (req, res) => {
        const id = req.params.id;
        console.log('specific id',id)
        const query = { _id: new ObjectId(id) };
        const destination = await destinationsCollaction.findOne(query);
        res.json(destination)
    })

    // POST API
    app.post('/destinations', async (req, res) => {
        const destination = req.body;
        console.log('hitting', destination)
        const result = await destinationsCollaction.insertOne(destination);
        console.log(result)
        res.json(result)
    })

    // // for booking
    // // POST API
    // app.post('/orders', async (req, res) => {
    //     const booked = req.body;
    //     console.log('hitting', booked)

    //     const result = await bookedTour.insertOne(booked);
    //     console.log(result)
    //     res.json(result)
    // })

    //DELETE API
    app.delete('/destinations/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await destinationsCollaction.deleteOne(query)
        console.log(result)
        res.json(result)
    })
    // // for booking
    // //DELETE API
    // app.delete('/booked/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await bookedTour.deleteOne(query)
    //     console.log(result)
    //     res.json(result)
    // })


    // //UPDATE API
    // app.put('/books/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const updatedBook = req.body;
    //     const filter = { _id: ObjectId(id) };
    //     const updateDoc = {
    //         $set: {
    //             name: updatedBook.name,
    //             writer: updatedBook.writer,
    //             hints: updatedBook.hints,
    //             img: updatedBook.img,
    //             price: updatedBook.price,
    //         },
    //     };
    //     const result = await booksCollaction.updateOne(filter, updateDoc)
    //     console.log('updating', id)
    //     res.json(result)
    // })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})