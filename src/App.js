import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './component/Navbar';
import Cart from './component/cart/Cart';
import ProductList from './component/ProductList';
import Details from './component/Details';
import Look from './component/look';
import Modal from './component/Modal';
import Footer from './component/Footer';


function App() {
  return (
    <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ProductList}/>
          <Route path="/details" component={Details}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/yourLook" component={Look}/>
        </Switch>
        <Modal/>
        <Footer/>
     </React.Fragment>
  );
}

export default App;
