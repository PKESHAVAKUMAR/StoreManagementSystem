import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';


type newProduct = {
  id: number;
  name: string;
  price: number;
  // Add more product properties as needed
};

const Dashboard = () => {
  
  const [products, setProducts] = useState<newProduct[]>([]);

  const handleAddProduct = (product: newProduct) => {
    setProducts([...products, product]);
  };

  return (
    <div>
      <h2>Welcome Dashboard</h2>
      <AddProduct onAdd={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
