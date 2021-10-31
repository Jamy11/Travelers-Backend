const express = require('express');
const { CommandStartedEvent } = require('mongodb');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3fsfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect()
        console.log('connected')
        const database = client.db('travel')
        const servicesCollection = database.collection('services')
        const userCollection = database.collection('users')


        app.get('/services', async (req,res)=>{
            const cursor = servicesCollection.find({})
            const result = await cursor.toArray()
            res.json(result) 
            
        })

        app.post('/products/bykeys',async (req,res)=>{
           
        })
    }
    finally{
        // await client.close()
    }
}

run().catch(console.dir)

// app.get('/',(req,res)=>{
//     res.send('Server is running')
// })

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})