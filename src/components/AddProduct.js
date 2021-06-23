import {useRef,useState} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory}from 'react-router-dom'

function AddProduct(){
    let {register,handleSubmit,formState:{errors}} =useForm();
    const [file,setFile]=useState(null)
    const history=useHistory()
    const onFormSubmit=(productObj,e)=>
    {
        console.log("the product",productObj)
        let formData=new FormData();
        formData.append("photo",file)
        //console.log('file is',file)
       const some= formData.append("productObj",JSON.stringify(productObj))
        console.log("userobj in register",some)
        e.preventDefault();
        console.log("formdata",formData)
        axios.post(" /product/createproduct",formData)
        .then(res=>{
            let resObj=res.data;
           // console.log('the response is',resObj)
            alert(resObj.message);
           // history.push('/Login')
        })
        .catch(
            err=>{
                console.log(err);
                alert("something went wrong at product")
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
    const onFileSelect=(e)=>{
        setFile( e.target.files[0]);
     }
  
    return(
        <form className="w-75   container"onSubmit={handleSubmit(onFormSubmit)}>
	    <div>
            
       <label htmlFor="un" className="mt-5"> ProductName</label>
		       <input type="text" id="un" 
		       {...register('productname',{required:true})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="enter product name"    autoComplete="off"/>
              


                 <label htmlFor="q" className="mt-5"> Product Details</label>
		       <input type="text" id="q" 
		       {...register('details',{required:true})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="quantity"    autoComplete="off"/>
               

         <label htmlFor="r" className="mt-5"> Rating</label>
		       <input type="number" id="r" 
		       {...register('rating',{required:true})}
		       className="form-control mt-3 border-danger  " 
		        placeholder="rating"    autoComplete="off"/>

            <label htmlFor="f" className="mt-5"> Upload File</label>
		       <input type="file" id="f" 
		      name="photo"
		       className="form-control mt-3 border-danger  " 
		        {...register('file')}
                onChange={(e)=>{onFileSelect(e)}}
                />
           
               
                <button type="submit" className="btn btn-success mt-5">AddProduct</button>
                </div>
		</form>
    )
}
export default AddProduct;