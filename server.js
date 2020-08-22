const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoutdb', { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log('awesome! we connected to the server');
    } else{
        console.log('dun dun dunnn, something went wrong')
    }
});

