const mongoose = require('mongoose');

// data schema
const itemSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true
    },
    todo:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', itemSchema);


// ! ========================================= ! //
// data schema
// const userSchema = {
//     name: String,
//     email: String,
//     password: String
// };

// data model
// const User = mongoose.model("User", userSchema);