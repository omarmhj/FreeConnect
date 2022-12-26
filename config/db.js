const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.4p6hmep.mongodb.net/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log(`Failed to connect to mongoDB ${err}`))