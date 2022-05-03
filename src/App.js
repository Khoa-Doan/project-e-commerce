import React, { useState, useEffect } from 'react';

import { commerce } from './lib/commerce'
import { Products, Navbar } from './components';

const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const respone = await commerce.products.list();
        const { data } = respone;

        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    console.log(products);

    return (
        <div>
            <Navbar />
            <Products />
        </div>
  )
}

export default App