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
require('dotenv').config()
//////////////db connection
const dburl=process.env.DATABASE_URL
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
         let usercartcollectionObject=databaseObj.collection("usercartcollection")
         app1.set("usercollectionObject",usercollectionObject)
         app1.set("productcollectionObject",productcollectionObject)
         app1.set("admincollectionObject",admincollectionObject)
         app1.set("usercartcollectionObject",usercartcollectionObject)
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
app1.listen(process.env.PORT,()=>
console.log("server is listening at 8080")
)

