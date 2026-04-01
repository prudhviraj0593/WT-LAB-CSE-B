const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'SNIST';

let db;

MongoClient.connect(MONGO_URI)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(DATABASE_NAME);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));

/* ROUTES */

// Home
app.get('/', async (req, res) => {
    const items = await db.collection('items').find().toArray();
    res.render('index', { items });
});

// Create
app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    await db.collection('items').insertOne({
        name: req.body.name,
        description: req.body.description
    });
    res.redirect('/');
});

// Edit
app.get('/edit/:id', async (req, res) => {
    const item = await db.collection('items').findOne({
        _id: new ObjectId(req.params.id)
    });
    res.render('edit', { item });
});

app.post('/edit/:id', async (req, res) => {
    await db.collection('items').updateOne(
        { _id: new ObjectId(req.params.id) },
        {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }
    );
    res.redirect('/');
});

// Delete
app.post('/delete/:id', async (req, res) => {
    await db.collection('items').deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.redirect('/');
});