import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Redirect
} from "react-router-dom"
import Navbar from './components/Navbar'
import ProductsListing from './pages/ProductsListing'
import ProductDetails from './pages/ProductDetails'
import CartDetails from './pages/CartDetails'

class App extends React.Component {
  render() {
    return (
      <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" >
              <Redirect to="/women"/>
            </Route>
            <Route path="/women">
              <ProductsListing forWho="women"/>
            </Route>
            <Route path="/men">
              <ProductsListing forWho="men"/>
            </Route>
            <Route path="/kids">
              <ProductsListing forWho="kids"/>
            </Route>
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart" component={CartDetails} />
          </Switch>
      </Router>
    )
  }
}

export default App;
