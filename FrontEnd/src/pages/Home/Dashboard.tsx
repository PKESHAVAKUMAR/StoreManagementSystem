import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';


type Product = {
  id: number;
  name: string;
  price: number;
  // Add more product properties as needed
};

const Dashboard = () => {
  
  
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      
      <h2>Welcome Dashboard</h2>
      {/* <AddProduct onAdd={handleAddProduct} /> */}
      <ProductList  />
      
    </div>
  );
};

export default Dashboard;
