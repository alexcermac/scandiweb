import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Redirect
} from "react-router-dom"
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import ProductsListing from './pages/ProductsListing'
import ProductDetails from './pages/ProductDetails'
import CartDetails from './pages/CartDetails'

class App extends React.Component {
  render() {
    return (
      <Router>
          <ScrollToTop />
          <Navbar />
          <Switch>
            <Route exact path="/" >
              <Redirect to="/women"/>
            </Route>
            <Route path="/women" component={ProductsListing}/>
            <Route path="/men" component={ProductsListing} />
            <Route path="/kids" component={ProductsListing} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart" component={CartDetails} />
          </Switch>
      </Router>
    )
  }
}

export default App;
