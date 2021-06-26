import { useState,useEffect } from "react";
import axios from 'axios'
function ViewProduct(props){
    let list;
    let [product,setProduct]=useState(null);
  
  
      let[type,setType]=useState('')
      let type1=localStorage.getItem("type")
      useEffect(()=>{
        setType(localStorage.getItem("type"))
      })
     
      const user=()=>{
        return type==='user'?true:false
      }
      const admin=()=>{
        return type==='admin'?true:false
      }
      
      //console.log("the type1",(typeof type1))
  
    useEffect(()=>{
        fetch("/product/getproduct")
    .then(res=>res.json())
    .then(data=>
        {
            
   // console.log('the users',data.message);
    setProduct(data.message);
       
       
    })})
    function removeFromDatabase(productObj){
      console.log("the deleting producte object",productObj)
      axios.post("/product/deleteproduct",productObj)
      .then(res=>{
        let resObj=res.data
        alert(resObj.message)
      })
      .catch(err=>{
        console.log("err while deleting",err)
        alert("something went wrong while deleting product")
      })

    }
    function addProductToCart(product){
    
     // console.log("the product is",product)
      let username=localStorage.getItem("username")
      let newObj={username,product}
     // console.log("added item to cart",newObj)
      axios.post("/user/addtocart",newObj)
      .then(res=>{
        let resposeObj=res.data
        alert(resposeObj.message)
      })
      .catch(err=>{
        console.log("err in adding item")
        alert("something went wrong while adding product")
      })
     
    }

    return(
      <div className="row row-col-sm-1 row-col-md-2 row-col-lg-3 container">
       {
           product && product.map((ele)=>{
                return(
                    <div className="col-sm-4">
                        <div className="card border border-dark mt-5 " >
                           
                           <img src={ele.pfofileImge} className="w-100" height="150px"/>
                            <h6>productname:{ele.productname}</h6>
                            <h6>model:{ele.details}</h6>
                            <h6>price:{ele.rating}</h6>
                              <div className="m-3">
                            
                           {user()&&<button className="btn btn-success m-3" onClick={()=>addProductToCart(ele)}>Add to cart</button>}
                           {user()&&<button className="btn btn-danger m-3" >Buy Now</button>}
                          { admin()&&<button className="btn btn-success m-3" onClick={()=>removeFromDatabase(ele)} >Remove</button>}
                          { admin()&&<button className="btn btn-danger m-3" >Edit</button>}
                        
                        
                        </div>
                           
                        </div>

                    </div>
                )
           })
       }
      </div>
  )


    
   /////////
    
  
}
export default ViewProduct;