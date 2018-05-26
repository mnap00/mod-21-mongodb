const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase');

const userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';
    return next(null, this.name);
};

userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

const User = mongoose.model('User', userSchema);

const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});

kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});

kenny.save(function(err) {
    if (err) throw err;
    console.log('User ' + kenny.name + ' saved successfuly');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});

benny.save(function(err) {
    if (err) throw err;
    console.log('User ' + benny.name + ' saved successfuly');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Your new name is: ' + name);
});

mark.save(function(err) {
    if (err) throw err;
    console.log('User ' + mark.name + ' saved successfuly');
});

const query = User.find({});
const promise = query.exec();
promise.then(function(records) {
    console.log('Actual database records are ' + records);
});
promise.catch(function(reason) {
    console.log('Something went wrong: ' + reason);
});
