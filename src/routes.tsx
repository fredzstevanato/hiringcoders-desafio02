import { BrowserRouter, Switch, Route } from "react-router-dom";

import { CreateProduct }  from "./pages/product/create";
import { ProductTable } from './pages/product/index'
import { CreateCostumer } from "./pages/costumers/create"
import { CostumersTable } from './pages/costumers/index'
import { Home } from './pages/index'


import { ProductsProvider } from './context/useProduct';
import { CostumersProvider } from './context/useCostumers';

export function Routes() {
  return(
    <BrowserRouter>
      <Switch>
      <CostumersProvider>
          <ProductsProvider>
            <Route path="/" exact component={Home}/>
            <Route path="/products" component={ProductTable} />
            <Route path="/products-create" component={CreateProduct} />
            <Route path="/costumers" component={CostumersTable}/>
            <Route path="/costumers-create" component={CreateCostumer} />
          </ProductsProvider>
        </CostumersProvider> 
      </Switch>
    </BrowserRouter>
  )
}