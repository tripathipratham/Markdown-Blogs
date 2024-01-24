const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () =>{
    const uri = process.env.uri;
    const localhost = 'mongodb://localhost:27017/blogs'
    try{
        const connect = await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connection Successful");
    }catch(err){
        console.log(`Error : ${err}`);
    }
}

connect();