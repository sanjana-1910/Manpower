const express=require('express')
const router=express.Router()

const bodyParser=require('body-parser')
const ContactModel=require('../Models/contact-model')

router.use(bodyParser.json())
router.get('/',(req,res)=>{
    res.send("Users page")
})

router.post('/post',(req,res)=>{
  console.log(req.body)
  
  const newContact=new ContactModel(req.body)

  newContact.save()
  .then(response=>console.log(response))
  .catch(err=>console.log(err))
  res.send("Contact page")
})

module.exports=router