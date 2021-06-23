let exp=require('express')
const adminapi=exp.Router()
adminapi.use(exp.json())
const jwt=require('jsonwebtoken')
const expressErrorHandler=require('express-async-handler')
//////////////login
adminapi.post('/login', expressErrorHandler(async (req,res,next)=>{
    console.log("this is admin")
    let admincollectionObject=req.app.get("admincollectionObject")
    
    console.log("the admin", await admincollectionObject.findOne({username:'admin'}))
    let credintials=req.body;
    console.log("the crentials",credintials)

   
    
    let user =await admincollectionObject.findOne({username:credintials.username})
    if(user==null)
    {
        res.send({message:"invalid username"})
    }
    else{
        //let result=await bcrypt.compare(credintials.password,user.password)
        if(credintials.password!==user.password)
        {
            res.send({message:"invalid password"})
        }
       
        else{
            delete user.password;
            let token=await jwt.sign({username:credintials.username},'abcd',{expiresIn:10})
            res.send({message:"login-success",token:token,username:credintials.username,userobj:user})
        }
    }
}))
module.exports=adminapi