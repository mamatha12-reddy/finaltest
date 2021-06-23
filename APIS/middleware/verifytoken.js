const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{
    try{
        let token=req.headers.Authorization.split(" ")[1]
        jwt.verify(token,'abcd')
        next()
    }
    catch(err){
        res.send({message:"auth failed"})
    }

}
module.exports=verifytoken;
