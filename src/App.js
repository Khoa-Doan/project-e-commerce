import React, { useState, useEffect } from 'react';

import { commerce } from './lib/commerce'
import { Products, Navbar, Cart } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const response = await commerce.products.list();
        const { data } = response;

        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart);
    }

    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        
        setCart(response.cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        
        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                    <Route exact path='/cart'
                        element={<Cart cart={cart}
                                        handleUpdateCartQty={handleUpdateCartQty}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                        handleEmptyCart={handleEmptyCart} />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App