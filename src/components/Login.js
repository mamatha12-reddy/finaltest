import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useState } from "react"


import axios from'axios'
function Login(props){
    let [users1,setUser]=useState(null);
    let {register,handleSubmit,formState:{errors}} =useForm();
    let history=useHistory();
   /* fetch(" http://localhost:8080/users")
    .then(res=>res.json())
    .then(data=>
        {
   // console.log('the users',data);
    setUser(data);
       
       
    })*/
    const onFormSubmit=(userObj)=>
		{
		    console.log('userobj',userObj)
           
           /* axios.post('/admin/login',userObj)
            .then(res=>{
                let resObj=res.data;
               if(resObj.message==="login-success")
               {   alert(resObj.message)
               }
               else{
                   alert(resObj.message)
               }
            })
            .catch(
                err=>{
                    console.log(err);
                    alert("something went wrong at login")
                }
            )*/
            axios.post(`/${userObj.type}/login`,userObj)
            .then(res=>{
                let resObj=res.data;
               if(resObj.message==="login-success")
               {
                   localStorage.setItem("token",resObj.token)
                   localStorage.setItem("username",resObj.username)
                  localStorage.setItem("user",JSON.stringify (resObj.userobj))
                  localStorage.setItem("type",userObj.type)
                  
                   props.serUserLoginStatus(true)
                   if(userObj.type==="user")
                   {
                   
                    history.push(`/UserProfile/${resObj.username}`)
                    console.log("the user path")
                   }
                   if(userObj.type==="admin"){
                      
                       history.push(`/adminprofile/${resObj.username}`)
                       console.log("the admin path")
                   }
                   alert(resObj.message)
               }
               else{
                   alert(resObj.message)
               }
            })
            .catch(
                err=>{
                    console.log(err);
                    alert("something went wrong at login")
                }
            )
          
          /*  users1 && users1.map((ele)=>{
           if( (userObj.username!==ele.username))
            {
                alert('inavalid user name')
            }
            else if(userObj.userpassword!==ele.userpassword)
            {
                alert('inavalid credintials')
            }
            else{
                history.push("/UserProfile")
            }
        })*/
		}

    return(
       
      
   <form className="w-75   container"onSubmit={handleSubmit(onFormSubmit)}>
	    <div>
            <div className="mt-5">
        <input type="radio" id="admin"  value="admin" 
        {...register("type")} 
        className="form-check-input" />
            <label htmlFor="admin" className="form-check-label">admin</label>
            </div>
            <div className="mt-5">
            <input type="radio" id="user"  value="user" 
        {...register("type")} 
        className="form-check-input" />
            <label htmlFor="user" className="form-check-label">user</label>
            </div>
              {/*username */}
       <label htmlFor="un" className="mt-5"> UserName</label>
		       <input type="text" id="un" 
		       {...register('username',{required:true,minLength:4,maxLength:30})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="enter name"    autoComplete="off"/>
              
         <label htmlFor="up" className="mt-5"> UserPassword</label>
		       <input type="password" id="up" 
		       {...register('password',{required:true,minLength:4,maxLength:30})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="password"    autoComplete="off"/>
                <button type="submit" className="btn btn-success mt-5">Login</button>
                </div>
		</form>
        
		

         
       
    )
}
export default Login;