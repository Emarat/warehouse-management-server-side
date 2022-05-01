const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const items = [
    { id: 1, name: 'Diamond Halo Stud Earrings', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'jack', image: 'http://demo.bestprestashoptheme.com/greenbee/145-large_default/diamond-halo-stud-earrings-.jpg' },

    { id: 2, name: 'Diamond Halo Stud Kusto', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'kemmer', image: 'http://demo.bestprestashoptheme.com/greenbee/213-large_default/diamond-halo-stud-kusto.jpg' },

    { id: 3, name: 'Diamond Halo Stud Magnis', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'chemera', image: 'http://demo.bestprestashoptheme.com/greenbee/169-large_default/brown-bear-vector-graphics.jpg' },

    { id: 4, name: 'Diamond Halo Stud Massa', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bruyna', image: 'src="http://demo.bestprestashoptheme.com/greenbee/204-large_default/diamond-halo-stud-massa.jpg"' },

    { id: 5, name: 'Diamond Halo Stud Cum', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'polard', image: 'http://demo.bestprestashoptheme.com/greenbee/248-large_default/diamond-halo-stud-cum.jpg' },

    { id: 6, name: 'Diamond Halo Stud lychee', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', price: '£11.71', quantity: '10', supplier: 'bekham', image: 'http://demo.bestprestashoptheme.com/greenbee/251-large_default/diamond-halo-stud-cum.jpg' },
]

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