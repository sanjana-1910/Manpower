const mongoose=require('mongoose')

const contactSchema = new mongoose.Schema({
  name:String,
  email:String,
  phone:String,
  desc:String
})

const ContactModel = mongoose.model('contact',contactSchema)
module.exports=ContactModel


