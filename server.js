const mongoose = require('mongoose');
const express = require('express');
const { db } = require('./models/Workouts');
const path = require('path');

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



//API ROUTES
app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
    .then((response) => {
        res.json(response)
    }).catch((err) => {
    res.json(err.message);
    })
})

app.put('/api/workouts/:id', async (req,res) => {
    db.Workout.update(
        {_id: mongoose.Types.ObjectId(req.params.id)}, 
        {$push: { exercises: req.body }}, 
        {new: true}
    ).then((data) => res.json(data))
    .catch((err) => res.json(err));
})

app.post('/api/workouts', async ({ body }, res) => {
    try{
        let data = await db.Workout.create(body)
        res.json(data);
    }
    catch({ message}){
        res.json(message);
    }
});





app.listen(PORT, () => {
    console.log(`App running on ${PORT}!`)
})