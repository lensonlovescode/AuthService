const mongoose = require('mongoose')
const { isEmail}= require('validator')
const bcrypt = require('bcrypt')

const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an email'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    fullName: {
      type: String,
      required: true
    }

})

//fire a function before doc saved to db --> HashPasword
userSchema.pre('save',async function(next){
    const salt =  await bcrypt.genSalt() 
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

//static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect email');
};

module.exports = mongoose.model('User', userSchema);