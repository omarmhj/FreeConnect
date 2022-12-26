const express = require("express");
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }


app.use(cors(corsOptions));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// jwt 
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes)

// server 
app.listen(process.env.PORT, () => {
    console.log(`server Started at http://localhost:${process.env.PORT}`)
})
