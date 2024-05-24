const UserModel = require('../model/UserModel');
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')


exports.signup = async(req,res)=>{
    
    const {username,email,password} = req.body

    let user = await UserModel.findOne({email})

    if(user){
        return res.status(400).json({message:"mail id already registered"})
    }

    const activationCode=uuidv4()

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash("password",salt)

    user = UserModel({
        username,
        email,
        password:hashpassword,
        activationCode
    })

    await user.save()

    // mail 

    const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:process.env.email_id,
            pass:process.env.email_password
        }
    })

    const activationlink = `http://localhost:${process.env.port}/user/activate/${activationCode}`

    const mailoption ={
        from:process.env.email_id,
        to:email,
        subject:"Verification mail",
        text:`Click the below link ${activationlink}`
    }

    transport.sendMail(mailoption,(err,info)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:'cannot send the link activation link'}) 
        }
        else{
            return res.status(200).json({message:'Activation link send to your email please verify to proceed login'})
        }
    })
    
}

exports.activate= async(req,res)=>{
    const {activationCode}=req.params
    console.log(activationCode)
    let user = await UserModel.findOne({activationCode})
    if(!user){
       return res.status(500).json({message:"cannot send activation link"})
    }

    user.isActivated=true
    user.save()
    res.status(200).json({message:"Account activation successfull"})
}

exports.signin = async(req,res)=>{
    const { email, password } = req.body

    let user = await UserModel.findOne({email})

    if(!user){
        return res.status(400).json({message:"Email not found"})
    }

    const isMatching = await bcrypt.compare("password",user.password)


    if(!isMatching){
        return res.status(400).json({message:"Incorrect password"})
    }

    if(!user.isActivated){
        return res.status(400).json({message:"Account not yet activated.Please activate before login"})
    }

    return res.status(200).json({message:"Login Successfull", user})

}