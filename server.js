const mongoose = require('mongoose');
const express = require('express');
const { db } = require('./models/Workouts');

const PORT = process.env.PORT || 3000;

const app = express();

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

//connection to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutdb', { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log('awesome! we connected to the database.');
    } else{
        console.log('dun dun dunnn, something went wrong')
    }
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}!`)
})



//HTML ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'))
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'))
});



