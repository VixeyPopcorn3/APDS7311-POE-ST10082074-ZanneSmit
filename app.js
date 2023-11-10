const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const cors = require('cors');

const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {server: { sslCA: cert}};
const connstring = 'mongodb+srv://Vixey:Figero37@cluster0.cc4dikm.mongodb.net/?retryWrites=true&w=majority'

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const lockAccount = require("./routes/lockAccount");

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT Connected :-(')
},options);

app.use(express.json());

app.use((reg,res,next) =>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Origin','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Controll-Allow-Methods','*');
    next();
});

// This allows requests from all origins
app.use(cors()); 

// Handle preflight requests for all routes
app.options('*', cors());

app.get(urlprefix + '/', (req, res) => 
{
    res.send('OM Nom Nom');
});

app.use(urlprefix + '/posts', postRoutes)

app.use(urlprefix + '/users', userRoutes)

app.use(urlprefix + '/lockAccount', lockAccount);

module.exports = app;
/*const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose')
const Fruit = require('./models/fruit')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {server: { sslCA: cert}};
const connstring = 'mongodb+srv://Vixey:Figero37@cluster0.cc4dikm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT Connected :-(')
},options);


app.use(express.json())


app.get(urlprefix + '/', (req, res) => 
{
    res.send('OM Nom Nom');
})

app.get(urlprefix + '/fruits', (req, res) => 
{
    const fruits = 
    [
        {
            id: "1",
            name: "Orange"
        },
        {
            id: "2",
            name: "Banana"
        },
        {
            id: "3",
            name: "Pear"
        }
    ];
    res.json
    (
        {
            message: "Fruits",
            fruits: fruits
        }
    )
    Fruit.find().then((fruits) =>
    {
        res.json
        ({
            message: 'Fruits found',
            fruits:fruits
        })
    })
});

app.post(urlprefix + '/fruits', (req, res) =>
{
    const fruit = new Fruit
    ({
        id: req.body.id,
        name: req.body.name
    })
    fruit.save();
    res,status(201).json
    ({
        message: 'fruit created',
        fruit: fruit
    })
})

app.delete(urlprefix + "/fruits/:id", (req, res) =>
{
    Fruit.deleteOne({_id: req.params.id})
    .then((result) =>
    {
        res.status(200).json({message: "Fruit Deleted"});
    });
})
module.exports = app;*/
