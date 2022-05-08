const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { ObjectID } = require('bson');
const res = require('express/lib/response');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const items = [
//     { 'name': 'Diamond Halo Stud Earrings', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Jack', 'image': 'http://demo.bestprestashoptheme.com/greenbee/145-large_default/diamond-halo-stud-earrings-.jpg' },

//     { 'name': 'Diamond Halo Stud Kusto', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Kemmer', 'image': 'http://demo.bestprestashoptheme.com/greenbee/213-large_default/diamond-halo-stud-kusto.jpg' },

//     { 'name': 'Diamond Halo Stud Magnis', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Chemera', 'image': 'http://demo.bestprestashoptheme.com/greenbee/169-large_default/brown-bear-vector-graphics.jpg' },

//     { 'name': 'Diamond Halo Stud Massa', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Bruyna', 'image': 'http://demo.bestprestashoptheme.com/greenbee/204-large_default/diamond-halo-stud-massa.jpg' },

//     { 'name': 'Diamond Halo Stud Cum Apple', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Polard', 'image': 'http://demo.bestprestashoptheme.com/greenbee/248-large_default/diamond-halo-stud-cum.jpg' },

//     { 'name': 'Diamond Halo Stud lychee', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Bekham', 'image': 'http://demo.bestprestashoptheme.com/greenbee/251-large_default/diamond-halo-stud-cum.jpg' },

//     { 'name': 'Diamond Halo Stud Earrings', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Jack', 'image': 'http://demo.bestprestashoptheme.com/greenbee/145-large_default/diamond-halo-stud-earrings-.jpg' },

//     { 'name': 'Diamond Halo Stud Kusto', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Kemmer', 'image': 'http://demo.bestprestashoptheme.com/greenbee/213-large_default/diamond-halo-stud-kusto.jpg' },

//     { 'name': 'Diamond Halo Stud Magnis', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Chemera', 'image': 'http://demo.bestprestashoptheme.com/greenbee/169-large_default/brown-bear-vector-graphics.jpg' },

//     { 'name': 'Diamond Halo Stud Massa', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Bruyna', 'image': 'http://demo.bestprestashoptheme.com/greenbee/204-large_default/diamond-halo-stud-massa.jpg' },

//     { 'name': 'Diamond Halo Stud Cum Apple', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Polard', 'image': 'http://demo.bestprestashoptheme.com/greenbee/248-large_default/diamond-halo-stud-cum.jpg' },

//     { 'name': 'Diamond Halo Stud lychee', 'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 'price': '£11.71', 'quantity': '10', 'supplier': 'Bekham', 'image': 'http://demo.bestprestashoptheme.com/greenbee/251-large_default/diamond-halo-stud-cum.jpg' }
// ]


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1kfjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const fruitsCollection = client.db("fruitsWarehouse").collection("fruit");

        app.get('/fruit', async (req, res) => {
            const query = {};
            const cursor = fruitsCollection.find(query);
            const fruits = await cursor.toArray();
            res.send(fruits);
        });
        // const result = await fruitsCollection.insertMany(items);
        // console.log(`${result.insertedCount} documents were inserted`);

        app.put('/fruit/:id', async (req, res) => {
            const id = req.params.id;
            // const newQty = { 'quantity': Number(req.body) };
            const updateQty = req.body;
            const filter = { _id: ObjectID(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: updateQty
            };

            const result = await fruitsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.get('/fruit/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const fruit = await fruitsCollection.findOne(query);
            res.send(fruit);
        })

        app.delete('/fruit/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await fruitsCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);





// app.get('/items', (req, res) => {
//     res.send(items);
// });

// app.get('/item/:id', (req, res) => {
//     console.log(req.params);
//     const id = parseInt(req.params.id);
//     const item = items.find(item => item.id === id);
//     res.send(item);
// });

app.listen(port, () => {
    console.log("listening");
});