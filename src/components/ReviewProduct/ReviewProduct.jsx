import React from 'react';
import './ReviewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const ReviewProduct = ({product,handleRemoveFormCart}) => {
    const {id,img,price,name,quantity} = product;
    return (
        <div className='Review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                  <p className='product-title'>{name}</p>
                  <p>price: <span className='orange-text'>${price}</span></p>
                  <p>order quantity: <span className='orange-text'>${quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveFormCart(id)}    className='btn-delete'><FontAwesomeIcon className='delete-icon'   icon={faTrashAlt}></FontAwesomeIcon></button>
        </div>
    );
};

export default ReviewProduct;