import React from 'react'
import { useEffect } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsync } from './productSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';
import { addAsync } from '../cart/cartSlice';

export type Product = {
    id : number;
    thumbnail: string;
    title : string;
    price : number;
    description : string
    brand : string
    quantity : number
    
  }

function Produtcs() {

    useEffect(()=>{
        dispatch(fetchAsync())
      },[])
    
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const products = useSelector((state:RootState) => state.product.products)

    return (
        <>
            
            {products.map((product:Product) =><div className="card">
                <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
                <h1>{product.title}</h1>
                <p className="price">${product.price}</p>
                <p>{product.description}</p>
                <p><button onClick={()=>dispatch(addAsync(product))}>Add to Cart</button></p>
            </div>)}
            
        </>
    )
}

export default Produtcs