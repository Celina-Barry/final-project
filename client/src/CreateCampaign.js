import React from 'react';
import styled from 'styled-components';
//import { useCart } from './CartContext';
import CartItems from './CartItems';

const CartPageContainer = styled.div`
    padding: 20px;
`;

const TotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const TotalLabel = styled.p`
    font-weight: bold;
`;

const CartPage = () => {
    const { cartState, dispatch } = useCart();
    console.log("cartState: ", cartState)

    const updateQuantity = (item, newQuantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { item, quantity: newQuantity } });
    };

    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { item } });
    };

    const calculateTotal = () => {
        return cartState.items.reduce((total, itemEntry) => total + itemEntry.price * itemEntry.quantity, 0);
    };

    return (
        <CartPageContainer>
            {cartState.cartItems.map((itemEntry) => {
                console.log("cartState.cartItems: ", cartState.cartItems)
                return (
                    <CartItems
                        key={`item-${itemEntry._id}`}
                        itemEntry={itemEntry}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                    />
                );
})}
    <TotalContainer>
        <TotalLabel>Total:</TotalLabel>
        <p>${calculateTotal().toFixed(2)}</p>
    </TotalContainer>
    </CartPageContainer>
    );
};

export default CartPage;
