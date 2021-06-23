import { useState,useEffect } from "react";

function ViewProduct(){
    let list;
    let [users1,setUser]=useState(null);
    useEffect(()=>{
        fetch("/product/getproduct")
    .then(res=>res.json())
    .then(data=>
        {
            
    console.log('the users',data.message);
    setUser(data.message);
       
       
    })},[])
    
   
    return(
        <div class="row  row-cols-sm-3 ">
  
   {
      users1 && users1.map((ele)=>{
            return(

               
                    <div >

  <div class="col ">
    <div class="card mt-5  border border-dark ">
      <div class="card-head">
      <img src={ele. pfofileImge} width="250px" height="170px"/> 
      </div>
      <div class="card-body  text-black">
       
       
        <h3>productname:{ele.productname}</h3>
               
               <h3>details:{ele.details}</h3>
               <h3>rating:{ele.rating}</h3>
      </div>
    </div>
  </div>
  
</div>
             

            )
        })
    }
   
   </div>
    )
    
  
}
export default ViewProduct;