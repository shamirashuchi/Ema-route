import React, { useState } from 'react';
import './Orders.css';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedcart = useLoaderData();
    const [cart,setCart] = useState(savedcart);
    const handleRemoveFormCart = (id) =>{
        const remaining = cart.filter(product => product.id !== id);
        //console.log(remaining);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    // console.log(cart)
    return (
        <div className='shop-container'>
            <div className='review-container'>
               {
                cart.map(product => <ReviewProduct
                key={product.id}
                product={product}
                handleRemoveFormCart = {handleRemoveFormCart}
                ></ReviewProduct>)
               }
            </div>
            <div className='cat-container'>
                <Cart cart={cart}
                handleClearCart={handleClearCart}>
                    <Link className='proceed-link'to="/checkout">
                    <button className='btn-proceed'>Proceed Checkout</button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;