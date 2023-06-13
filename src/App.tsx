import React from 'react';
import { useEffect , useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { RootState } from './App/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from '@reduxjs/toolkit';
import './App.css';
import { fetchAsync } from './features/cart/cartSlice';
import Produtcs from './features/product/Produtcs';
import Cart from './features/cart/Cart';

function App() {

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const [showCart , setShowCart] = useState(false)
  const items = useSelector ( (state : RootState) => state.cart.items)

  useEffect(()=>{
    dispatch(fetchAsync())
  },[])

  return (
    <div className="App">
      <button onClick={()=>setShowCart(!showCart)}>{showCart ? "Go to Homepage" :`Cart(${items.length})`}</button>
      {showCart ?<Cart/>:<Produtcs/> }
      
      
    </div>
  );
}

export default App;
