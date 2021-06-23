const exp=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressErrorHandler=require('express-async-handler')
const verifytoken=require('./middleware/verifytoken')
const userapi=exp.Router()

 /////////////////////
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')








 //configure cloudinary
cloudinary.config({
    cloud_name: 'djqbwmvjg',
    api_key: '492171555336437',
    api_secret: 'OO5HtI8g0gpuIZyjR3m1jXa9-KE'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Data.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})
 //create new user
 userapi.use(exp.json())
 /*userapi.post('/createuser',(req,res,next)=>{
     let newUser=req.body;
     usercollectionObject.insertOne(newUser,(err,success)=>{
         if(err){
             console.log("err in user creation",err)
         }
         else{
             res.send({message:"user added succesfully"})
         }
     })
 })*/
 ////////////////////////////////////////////////////getting userlist
 userapi.get('/getuser',expressErrorHandler( async (req,res,next)=>{
     /*usercollectionObject.find().toArray()
     .then(userList=>{
         res.send({message:userList})
     })
     .catch(err=>{
        console.log("err in reading data",err)
        res.send({message:err.message})
     })*/
     let usercollectionObject=req.app.get("usercollectionObject")
     let userList=await usercollectionObject.find().toArray()
     res.send({message:userList})
 }))
 //////////////////////////////////////////////////getting object with username
 userapi.get('/getuser/:username',   expressErrorHandler(async (req,res,next)=>{
    let usercollectionObject=req.app.get("usercollectionObject")
    let un =req.params.username
   let userObj=await   usercollectionObject.findOne({username:un})
   if(userObj==null)
   {
       res.send({message:"user not existed"})
   }
   else{
       res.send({message:userObj})
   }
    /* .then(userObj=>{
         if(userObj !==null)
         {
            res.send({message:userObj})
         }
         else{
            
             res.send({message:"user not existed"})
         }
     })
     .catch(err=>{
        console.log("err in reading data",err)
        res.send({message:err.message})
     })*/
 }))
 //////////////////////////////////////////////////////////////////////crating user
 userapi.post("/createuser",multerObj.single('photo'), expressErrorHandler(async (req, res, next) => {
    //get user obj
    let usercollectionObject=req.app.get("usercollectionObject")
    let newUser=req.body
    //let newUser = JSON.parse(req.body.userObj);
    //seach for existing user
   let user=await usercollectionObject.findOne({ username: newUser.username })
   if (user === null) {
       let hasedpassword=await bcrypt.hash(newUser.password,7)
        newUser.password=hasedpassword
        //newUser.pfofileImge=req.file.path;
       // console.log("the hased password",hasedpassword)
     await usercollectionObject.insertOne(newUser)
     res.send({message:"user created successfully"})
   }
   else {
    res.send({ message: "User already existed" })
}

       /* .then(user => {
            //if user is existed
            if (user === null) {
                usercollectionObject.insertOne(newUser)
                    .then((success) => {
                        res.send({ message: "User created" })
                    })
                    .catch(err => res.send(err.message))
               
            }
            else {
                res.send({ message: "User already existed" })
            }
        })*/
}))
///////////////////////////////////////////////////////////////////////update user
userapi.put("/updateuser/:username",expressErrorHandler(async (req,res,next)=>{
    let usercollectionObject=req.app.get("usercollectionObject")
    
    let un=req.params.username
    let modifiedUser=req.body;
     let userObj= await usercollectionObject.findOne({username:un})
    if(userObj !==null)
    {
        let hasedpassword=await bcrypt.hash(modifiedUser.password,7)
        modifiedUser.password=hasedpassword
        await usercollectionObject.updateOne({username:un},
            {$set:{...modifiedUser}})
                res.send({message:"user updated successfully"})
    }
    else{
        res.send({message:"user not existed"})
    }
   /* .then(userObj=>{
        if(userObj !==null)
        {
            usercollectionObject.updateOne({username:un},
                {$set:{
                    username:modifiedUser.username,
                    email:modifiedUser.email,
                    city:modifiedUser.city,
                    lastname:modifiedUser.lastname,
                    id:modifiedUser.id
                }})
                    res.send({message:"user updated successfully"})
        }
        else{
            res.send({message:"user not existed"})
        }
    })
   
           
            .catch(err=>{
                console.log("err in reading data",err)
                res.send({message:err.message})
             })*/

}))
/////////////////////////////deleting  unwanted userobject
userapi.delete('/deleteuser',expressErrorHandler((req,res,next)=>{
    let usercollectionObject=req.app.get("usercollectionObject")
    usercollectionObject.deleteMany({username:null})
    res.send({message:"unwanted data is cleared"})
}))
userapi.delete('/deleteuser/:id',expressErrorHandler(async (req,res,next)=>{
    let usercollectionObject=req.app.get("usercollectionObject")
    let un =+req.params.id
    let userObj=await usercollectionObject.findOne({id:un})
    if(userObj===null)
    {
        res.send({message:"user not existed to delete"})
    }
    else{
        await usercollectionObject.deleteOne({id:un})
        res.send({message:"user deleted successfully"})
        
    }
    /*.then(userObj=>{
        if(userObj!==null)
        {
            usercollectionObject.deleteMany({id:un})
            res.send({message:"user deleted successfully"})
        }
        else{
            res.send({message:"user not existed to delete"})
        }
    })
    .catch(err=>{
        console.log("err in reading data",err)
        res.send({message:err.message})
     })*/

}))

/////////////////////////////////////////////////////////////user login
userapi.post('/login', expressErrorHandler(async (req,res,next)=>{
    let usercollectionObject=req.app.get("usercollectionObject")
    let credintials=req.body;
    /////
    console.log("the data in userobj",credintials)
    let user =await usercollectionObject.findOne({username:credintials.username})
    if(user==null)
    {
        res.send({message:"invalid username"})
    }
    else{
        let result=await bcrypt.compare(credintials.password,user.password)
        if(result==false)
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
///////////////protect route
userapi.get("/testing",verifytoken, expressErrorHandler((req,res)=>{
    res.send({message:"this is test"})
}))

module.exports=userapi;

