import React, { useState } from 'react';

type Product = {
    id: number; // Add the id property
    name: string;
    price: number;
    // Add more product properties as needed
  };

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
