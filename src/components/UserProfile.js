import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ViewProduct from './ViewProduct';
function UserProfile(){
    let paramsobj=useParams();
    let [user,setUser]=useState('')
   let history=useHistory();

    useEffect(()=>{ 
     let userobj= JSON.parse(localStorage.getItem('user'));
     setUser({...userobj})
       /* axios.get(`/user/getuser/${paramsobj.username}`)

    .then( (res)=> {
      let userobj=res.data.message;
      setUser({...userobj})

    })
    .catch(function (error) {
    
      console.log(error);
    })*/
  },[paramsobj.username])
    ///////////////////////////////////logout
    // function  Logout1(){
      //console.log("hai hello");
      //localStorage.removeItem("token")
     // history.push('/user/login')
      //alert(' please login again')
     //}
   
   
   // console.log("parasmsobj,",paramsobj)
    return(
      <div>
    {/*    <button onClick={()=>Logout1()} className="btn btn-secondary text-white m-5 d-flex justify-content-end"> Logout</button>*/}
        <div className="text-center text-primary m-3">
           <h4  className="text-right"> username:{user.username}</h4> 
           <h4>useremail:{user.email}</h4> 
           
           <h4>userdob:{user.date}</h4> 
           <ViewProduct/>
           <img src={user.profileImage} width="200px"/>
        </div>
        </div>
    )
}
export default UserProfile;

