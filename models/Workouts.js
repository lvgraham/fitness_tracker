const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = newSchema ({
    type: String,
    name: String,
    duration: Number,
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number
})

const WorkoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now,
    }, 

    exercises: [ExerciseSchema]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;