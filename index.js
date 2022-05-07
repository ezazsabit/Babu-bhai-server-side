// const express = require('express')
// const app = express()
// const cors=require('cors')
// const port = process.env.PORT||5000;
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()

// app.use(cors());
// app.use(express.json());
// console.log(process.env)
// const uri = `mongodb+srv://sabit:VXG0vMqZlBAgEqmm@babubhai.26i70.mongodb.net/Inventories?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run() {
//     try {
//         await client.connect()
      
//      } 
//      finally {
//          console.log('finallly')
     
//     }
//   }
//   run().catch(console.dir);


// app.get('/pp', (req, res) => {
//   res.send('Hello World!')
// })



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sabit:ltBlZNgNiF4XZayr@babubhai.26i70.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        console.log('try')
        await client.connect()
        const bookCollection = client.db("BabuBhai").collection('Inventories')
        app.get("/inventory", async (req, res) => {
            const query = {}
            const cursor = bookCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get("/inventory/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const cursor = await bookCollection.findOne(query)
            res.send(cursor)
        });



    }
    finally {

    }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});