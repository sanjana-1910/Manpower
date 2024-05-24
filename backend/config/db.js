const mongoose = require('mongoose')

const db = () =>{
    mongoose.connect(process.env.db_url)

mongoose.connection.on('connected',()=>{
    console.log("Mongodb connected successfully");
})
}

module.exports=db