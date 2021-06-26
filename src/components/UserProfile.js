import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ViewProduct from './ViewProduct';
import {BrowserRouter,Switch, Link,Route } from 'react-router-dom'
import AddToCart from './AddToCart'
function UserProfile(){
    let paramsobj=useParams();
    let [user,setUser]=useState('')
   let history=useHistory();
   //let localcount=localStorage.getItem('count')
   //console.log("the localstoragecount ",localcount)
   //////////////////////////
   let [productarr,setProductArr]=useState('')
   let [count,setCount]=useState(0)
   let count1;
   useEffect(()=>{
       axios.get(`/user/gettingfromcart/${localStorage.getItem('username')}`)
   .then(res=>{
       let resObj=res.data.message
      
        //localStorage.setItem("array",resObj)
       // localStorage.getItem()
      let setProductArr1=resObj[0].products;
       setProductArr(setProductArr1)
        count1=setProductArr1.length
       setCount(count1)
      
       
       // console.log("the response from cart",setProductArr1)
   })
   })
  // console.log("the count from cart",count)
   //localStorage.setItem("count",count)
   //console.log("the  ..........." ,productarr)
   

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
         <BrowserRouter>
    {/*    <button onClick={()=>Logout1()} className="btn btn-secondary text-white m-5 d-flex justify-content-end"> Logout</button>
        <div className="text-center text-primary m-3">
           <h4  className="text-right"> username:{user.username}</h4> 
           <h4>useremail:{user.email}</h4> 
           
           <h4>userdob:{user.date}</h4> 
        
    <img src={user.profileImage} width="200px"/>
        </div>*/}
       
      
    <ul className="nav bg-light navbar-expand-sm d-flex sticky-top justify-content-end">
       
    <li className="nav-item">
        <Link  className="nav-link text-danger  "><h4> {user.username}</h4></Link>
        </li>
        <li className="nav-item">
        <Link to="/addtocart" className="nav-link text-danger  "><h4> <span className="border border-black text-white bg-primary">Cart:{count}</span></h4></Link>
        </li>
        </ul>
        <Switch>
      <Route path="/addtocart">
          <AddToCart productarr={productarr} count={count}/>
        </Route>
      </Switch>
       
</BrowserRouter>
<ViewProduct />

        </div>
    )
}
export default UserProfile;

