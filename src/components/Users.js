import { useState,useEffect } from "react";

function Users(){
    let list;
    let [users1,setUser]=useState(null);
    useEffect(()=>{fetch("/user/getuser")
    .then(res=>res.json())
    .then(data=>
        {
            
    console.log('the users',data.message);
    setUser(data.message);
       
       
    })},[])
    
   
    return(
        <div>
  
   {
      users1 && users1.map((ele)=>{
            return(
                <div className="card bg-light w-50  m-5 h-25 ">
               
                <h3>useremail:{ele.email}</h3>
                
                <h3>username:{ele.username}</h3>
                
              </div>

            )
        })
    }
   
   </div>
    )
    
  
}
export default Users;