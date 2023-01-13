const mongoose = require("mongoose");

mongoose.connect('mongodb://some-mongo:27017/freeConnect',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log(`Failed to connect to mongoDB ${err}`))