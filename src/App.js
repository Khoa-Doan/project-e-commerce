import React, { useState, useEffect } from 'react';

import { commerce } from './lib/commerce'
import { Products, Navbar } from './components';

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
        const item = await commerce.cart.add(productId, quantity);
        
        setCart(item);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
  )
}

export default App