const mongoose = require("mongoose")
mongoose.connect((process.env.MONGODB_ENV),{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
})


