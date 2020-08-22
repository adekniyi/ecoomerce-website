import React from 'react'
import CartItem from './CartItem';

function CartList(props) {
    const{cart} = props.value
    return (
        <div className="container-fluid">
            {
                cart.map(item=>{
                    return <CartItem key={item.id} cart = {item} value = {props.value}/>
                })
            }
        </div>
    )
}

export default CartList
