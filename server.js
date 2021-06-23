const exp=require('express')
const app1=exp();
const path=require('path')
const expressErrorHandler=require('express-async-handler')
app1.use(exp.static(path.join(__dirname,'./build/')))

const productapi=require('./APIS/productapi')
const userapi=require('./APIS/userapi')
const adminapi=require('./APIS/adminapi')
/////////db connection
//console.log("app")
app1.use('/user',userapi)
app1.use('/product',productapi)
app1.use('/admin',adminapi)
//////////////db connection
const dburl="mongodb+srv://mamatha:mamatha@cluster0.inrsm.mongodb.net/userdb?retryWrites=true&w=majority"
 const mongoclient=require("mongodb").MongoClient;
 
 mongoclient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
     if(err){
         console.log("err in db connect in user",err)
     }
     else{
          let databaseObj=client.db("userdb");
         let usercollectionObject=databaseObj.collection("usercollection")
         let productcollectionObject=databaseObj.collection("productcollection1")
         let admincollectionObject=databaseObj.collection("admincollection")
         app1.set("usercollectionObject",usercollectionObject)
         app1.set("productcollectionObject",productcollectionObject)
         app1.set("admincollectionObject",admincollectionObject)
         console.log("DB server connection success")
     }
 })
app1.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  
//app1.use('/product',productapi)
app1.listen(8080,()=>
console.log("server is listening at 8080")
)

