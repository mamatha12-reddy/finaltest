const exp=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressErrorHandler=require('express-async-handler')
const verifytoken=require('./middleware/verifytoken')
const productapi=exp.Router()
const dburl="mongodb+srv://mamatha:mamatha@cluster0.inrsm.mongodb.net/userdb?retryWrites=true&w=majority"
 
 /////////////////////
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')








 //configure cloudinary
cloudinary.config({
    cloud_name: 'dp6roa3ci',
    api_key: '636485635194798',
    api_secret: 'I8WgMAr2unSA-XJUe8XLQHhg1as'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'mamatha',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})
 //create new user
 productapi.use(exp.json())
 
 ////////////////////////////////////////////////////getting userlist
 productapi.get('/getproduct',expressErrorHandler( async (req,res,next)=>{
     /*usercollectionObject.find().toArray()
     .then(userList=>{
         res.send({message:userList})
     })
     .catch(err=>{
        console.log("err in reading data",err)
        res.send({message:err.message})
     })*/
     let productcollectionObject=req.app.get("productcollectionObject")
     let userList=await productcollectionObject.find().toArray()
     res.send({message:userList})
 }))
 //////////////////////////////////////////////////getting object with username
 productapi.get('/getuser/:username',   expressErrorHandler(async (req,res,next)=>{
    let productcollectionObject=req.app.get("productcollectionObject")
    let un =req.params.username
   let userObj=await productcollectionObject  .findOne({username:un})
   if(userObj==null)
   {
       res.send({message:"user not existed"})
   }
   else{
       res.send({message:userObj})
   }
   
 }))
 //////////////////////////////////////////////////////////////////////crating user
 productapi.post("/createproduct",multerObj.single("photo"), expressErrorHandler(async (req, res, next) => {
    //get user obj
    //let newUser=req.body
    let productcollectionObject=req.app.get("productcollectionObject")
    let newUser = JSON.parse(req.body.productObj);
    console.log("the new product",newUser.file)
    //seach for existing user
   let user=await productcollectionObject.findOne({ productname: newUser.productname })
   if (user === null) {
      // let hasedpassword=await bcrypt.hash(newUser.password,7)
       // newUser.password=hasedpassword
        newUser.pfofileImge=req.file.path;
       // console.log("the hased password",hasedpassword)
     await productcollectionObject.insertOne(newUser)
     res.send({message:"product created successfully"})
   }
   else {
    res.send({ message: "product already existed" })
}

}))
///////////////////////////////////////////////////////////////////////delete  product
productapi.post("/deleteproduct", expressErrorHandler(async(req,res)=>{
    let productcollectionObject=req.app.get("productcollectionObject")
    let productObj=req.body;
    let deleteproduct=await productcollectionObject.findOne({productname:productObj.productname})
    console.log("the deleting product ",deleteproduct)
   productcollectionObject.deleteOne({productname:productObj.productname})
   res.send({message:"product deleted successfully"})
}))

module.exports=productapi;

