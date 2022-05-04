const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const items = [
    { id: 1, name: 'Diamond Halo Stud Earrings', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'jack', image: 'http://demo.bestprestashoptheme.com/greenbee/145-large_default/diamond-halo-stud-earrings-.jpg' },

    { id: 2, name: 'Diamond Halo Stud Kusto', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'kemmer', image: 'http://demo.bestprestashoptheme.com/greenbee/213-large_default/diamond-halo-stud-kusto.jpg' },

    { id: 3, name: 'Diamond Halo Stud Magnis', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'chemera', image: 'http://demo.bestprestashoptheme.com/greenbee/169-large_default/brown-bear-vector-graphics.jpg' },

    { id: 4, name: 'Diamond Halo Stud Massa', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bruyna', image: 'http://demo.bestprestashoptheme.com/greenbee/204-large_default/diamond-halo-stud-massa.jpg' },

    { id: 5, name: 'Diamond Halo Stud Cum Apple', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'polard', image: 'http://demo.bestprestashoptheme.com/greenbee/248-large_default/diamond-halo-stud-cum.jpg' },

    { id: 6, name: 'Diamond Halo Stud lychee', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bekham', image: 'http://demo.bestprestashoptheme.com/greenbee/251-large_default/diamond-halo-stud-cum.jpg' },

    { id: 7, name: 'Diamond Halo Stud Earrings', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'jack', image: 'http://demo.bestprestashoptheme.com/greenbee/145-large_default/diamond-halo-stud-earrings-.jpg' },

    { id: 8, name: 'Diamond Halo Stud Kusto', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'kemmer', image: 'http://demo.bestprestashoptheme.com/greenbee/213-large_default/diamond-halo-stud-kusto.jpg' },

    { id: 9, name: 'Diamond Halo Stud Magnis', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'chemera', image: 'http://demo.bestprestashoptheme.com/greenbee/169-large_default/brown-bear-vector-graphics.jpg' },

    { id: 10, name: 'Diamond Halo Stud Massa', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bruyna', image: 'http://demo.bestprestashoptheme.com/greenbee/204-large_default/diamond-halo-stud-massa.jpg' },

    { id: 11, name: 'Diamond Halo Stud Cum Apple', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'polard', image: 'http://demo.bestprestashoptheme.com/greenbee/248-large_default/diamond-halo-stud-cum.jpg' },

    { id: 12, name: 'Diamond Halo Stud lychee', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bekham', image: 'http://demo.bestprestashoptheme.com/greenbee/251-large_default/diamond-halo-stud-cum.jpg' }
]


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1kfjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const fruitsCollection = client.db("fruitsWarehpuse").collection("fruit");

        const result = await fruitsCollection.insertMany(items);
        console.log(`${result.insertedCount} documents were inserted`);
    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);





app.get('/items', (req, res) => {
    res.send(items);
});

app.get('/item/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    res.send(item);
});

app.listen(port, () => {
    console.log("listening");
});