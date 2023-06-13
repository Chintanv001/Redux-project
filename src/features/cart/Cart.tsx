import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../App/store'
import { ChangeEvent } from 'react';
import './Cart.css'
import { deleteAsync, updateAsync } from './cartSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from '@reduxjs/toolkit'

function Cart() {
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items)

    const handleIncrement = (id: number) => {
        const item = items.find(item => item.id === id);
        if (item) {
            dispatch(updateAsync({ id, updatedItem: { quantity: item.quantity + 1 } }));
        }
    };

    const handleDecrement = (id: number) => {
        const item = items.find(item => item.id === id);
        if (item && item.quantity > 1) {
            dispatch(updateAsync({ id, updatedItem: { quantity: item.quantity - 1 } }));
        }
    };

   
    return (
        <div>
            <div>

                {items.map((item) => <div className="cart-item">
                    <img
                        className="img-fluid"
                        src={item.thumbnail}
                        alt=""
                    />
                    <div className="description">
                        <p>{item.title}</p>
                        <span>{item.brand}</span>
                        <strong>${item.price}</strong>
                    </div>
                    <div className="quantity">
                        Quantity
                        <div className="quantity-buttons">
                            <button onClick={() => handleDecrement(item.id)}>  -  </button>
                            <span>  {item.quantity}  </span>
                            <button onClick={() => handleIncrement(item.id)}> + </button>
                        </div>
                        
                    </div>
                    <div className='close'>
                        <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
                    </div>
                </div>
                )}
            </div>
            <h1>Total : {items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h1>
        </div>
    )
}

export default Cart