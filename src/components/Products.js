import {BrowserRouter,Switch, Link,Route } from 'react-router-dom'
import AddProduct from './AddProduct'
import Test from './Test'
import ViewProduct from './viewProduct'

function Products(){
return(
<BrowserRouter>

<ul className="nav bg-light navbar-expand-sm d-flex justify-content-end">
        <li className="nav-item">
        <Link to="/addproduct" className="nav-link text-danger  "><h4>Add Product</h4></Link>
        </li>
        <li className="nav-item">
        <Link to="/viewproduct" className="nav-link text-danger  "><h4>View Product</h4></Link>
        </li>
        </ul>
        <Switch>
      <Route path="/addproduct">
          <AddProduct/>
        </Route>
        <Route path="/viewproduct">
          <ViewProduct/>
        </Route>

        </Switch>
</BrowserRouter>

)
}
export default Products;