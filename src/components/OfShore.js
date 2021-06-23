import {useState} from 'react'
function OfShore()
{
    let [state,setState]=useState([]);
    let list1=['Chennai','Bangalore','Hyderabad','pune&Kochi']
    let list2=['US','Non US']
    const handleSelect=(e)=>{
        setState(list1);
       // e.preventDefault();
    }
    const handleSelect1=(e)=>{
        setState(list2);
       // e.preventDefault();
    }

    return(
        <div className="container form-check">
          
            <input type="radio" id="off"  name="offshore" value="offshore" onChange={handleSelect} className="form-check-control" />
            <label htmlFor="off" className="form-check-label">OffShore</label>
            <input type="radio" id="on"  name="onshore" value="onshore" onChange={handleSelect1} className="form-check-control"/>
            <label htmlFor="on " className="form-check-label">OnShore</label>
            <select className="form-check w-75">
                {
                     state.map((ele)=>{
                         return (
                             <option value={ele}> {ele}</option>
                         )
                     })
                }
               
            </select>
            <input type="radio" className="form-check-control" ></input>
            <input type="radio" className="form-check-control" ></input>
        </div>
    )
}
export default OfShore;
/*let [formstate,setFormState]=useState({ 
    associatename:’’,
    associateid:'',
    projectid:'',
    location:'',
    skills:'',
    Profile:'',
    comments:''

        })*/