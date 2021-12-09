const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes')
const port = 3001;

// * this is for security
const dotenv = require('dotenv');
dotenv.config();

// * ===== open port ===== *//
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/api', routes);
    app.listen(port, () => console.log(`PORT: ${port}\nconnected to MongoDB Atlas successfully`));
})



// * =================================================================== * //
// * This sets URL such as http://localhost:3000/default/Router{e.g. router.get}
// app.use('/default', Routes);
// * This is for setting body parser
// app.use(express.json());