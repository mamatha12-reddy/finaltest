import {useRef,useState} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory}from 'react-router-dom'

function UserRegistration(){
    let {register,handleSubmit,formState:{errors}} =useForm();
   
    const history=useHistory()
    const onFormSubmit=(userObj,e)=>
    {
       
        console.log("userobj in register",userObj)
        e.preventDefault();
        
        axios.post(" /user/createuser",userObj)
        .then(res=>{
            let resObj=res.data;
            alert(resObj.message);
            history.push('/Login')
        })
        .catch(
            err=>{
                console.log(err);
                alert("something went wrong")
            }

        )
      /* fetch(" /user/createuser",{
           method:"POST",
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify(userObj)
       })
       .then(res=>{return res.json()})
       .then(data=>{alert (data.message)})
       .catch(err=>console.log(err))*/


    }
  
    return(
        <form className="w-75   container"onSubmit={handleSubmit(onFormSubmit)}>
	    <h1> UserRegistration</h1>
        <div>
            
       <label htmlFor="un" className="mt-5"> UserName</label>
		       <input type="text" id="un" 
		       {...register('username',{required:true,minLength:4,maxLength:30})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="enter name"    autoComplete="off"/>
                {errors.username?.type==='required' && <p className="text-danger float-start ">please enter user name</p>}
       {errors.username?.type==='minLength' && <p className="text-danger  float-start">minmum of 5 charactrs expected</p>}
       {errors.username?.type==='minLength' && <p className="text-danger  float-start"> maximum length is 30</p>}



                 <label htmlFor="un" className="mt-5"> UserEmail</label>
		       <input type="email" id="un" 
		       {...register('email',{required:true,minLength:4,maxLength:30})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="enter email"    autoComplete="off"/>
                {errors.useremail?.type==='required' && <p className="text-danger float-start ">please enter useremail </p>}
       {errors.useremail?.type==='minLength' && <p className="text-danger  float-start">minmum of 5 charactrs expected</p>}
       {errors.useremail?.type==='minLength' && <p className="text-danger  float-start">maximum length is 30</p>}


         <label htmlFor="up" className="mt-5"> UserPassword</label>
		       <input type="password" id="up" 
		       {...register('password',{required:true,minLength:4,maxLength:30})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="password"    autoComplete="off"/>
                {errors.userpassword?.type==='required' && <p className="text-danger float-start ">please enter userpassword</p>}
       {errors.userpassword?.type==='minLength' && <p className="text-danger  float-start">minmum of 5 charactrs expected</p>}
       {errors.userpassword?.type==='minLength' && <p className="text-danger  float-start">maximum length is 30</p>}
           {/*} ///////////////date of birth*/}

           <label htmlFor="do" className="mt-5"> dateofbirth</label>
		       <input type="date" id="do" 
		       {...register('date',{required:true})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="date of borth"    autoComplete="off"/>

               
                <button type="submit" className="btn btn-success mt-5">Login</button>
                </div>
		</form>
    )
}
export default UserRegistration;