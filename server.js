const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv')

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the server
const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//checking connection'

db.connect((err) =>{
    if(err) return console.log("Error connecting to mysql");

    console.log("Connected to mysql as id:", db.threadId)
})

//starting the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    
    console.log(`Sending message to the browser....`)
    app.get('/', (req,res) => {
        res.send('Server is ready!!!!');
    });
});

// Question- 1 : Create a ```GET``` endpoint that retrieves all patients


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');


app.get('/data', (req,res) =>{
    db.query('SELECT * FROM patients', (err, results) =>{
       if(err){
        console.log(err);
        res.status(500).send('Error retrieving patient data')
       }else{
        res.render('data', {results:results});
       }
    });
}) ;


// Question- 2 : Create a ```GET``` endpoint that retrieves all provides



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');


app.get('/data', (req,res) =>{
    db.query('SELECT * FROM providers', (err, results) =>{
        if(err){
            console.log(err);
            res.status(500).send('Error retrieving providers table')
        }else{
            res.render('data', {results:results});
        }
    });
});


// Question -3  Create a ```GET``` endpoint that retrieves all patients by their first name

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/data', (req,res) =>{
    db.query('SELECT first_name FROM patients', (err, results) =>{
        if(err){
            console.log(err);
            res.status(500).send('Error retrievinbg frist name from patients')
        }else{
            res.render('data', {results:results})
        }
    });
});

// Question- 4 Create a ```GET``` endpoint that retrieves all providers by their specialty

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/data', (req,res) =>{
    db.query('SELECT provider_specialty FROM providers', (err,results) =>{
        if(err){
            console.assert(err);
            res.status(500).send('Error retriveing speciality from providers')
        }else{
            res.render('data', {results:results})
        }
    });
    
});