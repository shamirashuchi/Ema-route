import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data =>setProducts(data))
    },[])
    useEffect(() =>{
        const storedcart = getShoppingCart();
        //console.log(storedcart);
        let savedcart = [];
        //step-1
        for(const id in storedcart){
            //console.log(id);
            //step-2 get the product by using id
            const savedproduct = products.find(product => product.id === id)
            //console.log(savedproduct);
            //step 3 : get quantity of the product
            if(savedproduct){
            const quantity = storedcart[id];
            savedproduct.quantity = quantity;
            //step 4: add the savedproduct to the saved cart
            savedcart.push(savedproduct);
            }
            //console.log(savedproduct);
        }
        //step-5 set the cart
        setCart(savedcart);
    },[products])
    const handleAddToCart = (product) =>{
        //if product doesnot exist in the cart , then set quantity = 1
        //if exist update quantity by 1
        let newCart = [];
        const exist =  cart.find(pd => pd.id === product.id);
        if(!exist){
            product.quantity = 1;
            newCart = [...cart,product];
        }
        else{
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart =[...remaining, exist];
        }
             //const newCart = [...cart,product];
             setCart(newCart);
             addToDb(product.id)
    }
    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id}
                        product = {product}
                        handleAddToCart = {handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cat-container">
               <Cart cart={cart}
               handleClearCart={handleClearCart}
               >
                <Link className='proceed-link'to="/orders">
                    <button className='btn-proceed'>Review Order</button>
                </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;