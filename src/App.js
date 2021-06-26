import { useState } from "react";
import UserProfile from './components/UserProfile'
import UserRegistration from './components/UserRegistration'
import Users from './components/Users'
import Login from './components/Login'
import {BrowserRouter,Switch, Link,Route } from 'react-router-dom'
import OfShore from './components/OfShore'
import Home from "./components/Home";
import Test from './components/Test'
import Products from "./components/Products";
import AdminProfile from "./components/AdminProfile";
 
function App() {
    let [userLoginStatus,serUserLoginStatus]=useState('')
    const Logout=()=>{
      localStorage.clear();
      serUserLoginStatus(false)
    }
  return (
    
   <BrowserRouter>
   
  

  
      <ul className="nav bg-primary navbar-expand-sm d-flex justify-content-end">
       
        <li className="nav-item">
        <Link to="/test" className="nav-link text-white  "><h4>Test</h4></Link>
        </li>
        
        <li className="nav-item">
          <Link to="/users" className="nav-link text-white"><h4>Users</h4></Link>
  
         </li>
        <li className="nav-item">
        <Link to="/home" className="nav-link text-white"><h4>Home</h4></Link>
        </li>
        {
          !userLoginStatus? 
          <ul className="nav bg-primary navbar-expand-sm d-flex justify-content-end">
          <li className="nav-item">
          <Link to="/Login" className="nav-link text-white"><h4>Login</h4></Link>
          </li>
           <li className="nav-item">
           <Link to="/Registration" className="nav-link text-white  "><h4>Registation</h4></Link>
           </li>
           </ul>:
          <li className="nav-item">
          <Link to="/logout" className="nav-link text-white" onClick={()=>Logout()}><h4>logout</h4></Link>
  
         </li>
         
     
     }
       
      


      </ul>
      <Switch>
      <Route path="/test">
          <Test/>
        </Route>
        <Route path="/Registration">
          <UserRegistration/>
        </Route>
        <Route path="/Login">
         <Login serUserLoginStatus={serUserLoginStatus}/>
        </Route>
        <Route path="/home">
        <Home/>
        </Route>
        <Route path="/users">
        <Users/>
        </Route>
        <Route path="/UserProfile/:username">
        <UserProfile/>
        </Route>
      
        <Route path="/adminprofile/:username">
        <AdminProfile/>
        </Route>

      </Switch>
    
   </BrowserRouter>
  );
}

export default App;
