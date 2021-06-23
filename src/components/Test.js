
import axois from 'axios'


function Test(){
    let token=localStorage.getItem("token")
    let apiURL="http://localhost:8080"
    const axiosReq=axois.create({
        baseURL:apiURL,
        headers:{
            Authorization:`Bearer ${token}`
        }
    }


    )
    const makeReqToProtectedRoute=()=>{
        axiosReq .get("/user/testing")
        .then(res=>{
            alert(res.data.message)
        })
    }
    return(
        <div>
             <h1>test</h1>
             <button onClick={()=>makeReqToProtectedRoute()}>make req</button>
        </div>
       
    )
}
export default Test;