const mongoose = require('mongoose');

//Connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/authDB')
.then(() => {
    console.log('Connected to MongoDB locally');
    insertUsers();  
})
.catch(err => console.error('MongoDB connection error:', err));

//Schema for user authentication
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    }
});

//User model
const User = mongoose.model('User', userSchema);


function insertUsers() {
    const user1 = new User({
        username: 'johndoe',
        email: 'johndoe@123.com',
        password: 'johndoe123'
    });

    const user2 = new User({
        username: 'mungai',
        email: 'mungai@123.com',
        password: 'mungai123'
    });

    const user3 = new User({
        username: 'spongebob',
        email: 'spongebob@1223.com',
        password: 'spongebob123'
    });

    /*
    user1.save()
        .then(() => console.log('User 1 registered successfully!'))
        .catch(err => console.error('Error for user 1:', err.message));

    user2.save()
        .then(() => console.log('User 2 registered successfully!'))
        .catch(err => console.error('Error for user 2:', err.message));

    user3.save()
        .then(() => console.log('User 3 registered successfully!'))
        .catch(err => console.error('Error for user 3:', err.message));
    */


    User.insertMany([user1, user2, user3])
        .then(() => console.log('All users saved successfully!'))
        .catch(err => console.error('Insert error:', err.message));
}
