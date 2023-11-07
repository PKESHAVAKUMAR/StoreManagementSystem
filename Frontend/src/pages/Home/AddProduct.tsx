import axios from 'axios';
import React, { useState } from 'react';

type newProduct = {
  id: number;
  name: string;
  price: number;
};

type AddProductProps = {
  onAdd: (product: newProduct) => void;
};

const AddProduct: React.FC<AddProductProps> = ({ onAdd }) => {
  const [product, setProduct] = useState<newProduct>({
    id: 0,
    name: '',
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleAddProduct = () => {
    axios.post('/api/products', product)
      .then((response) => {
        console.log('Product saved:', response.data);
        // Optionally, pass the saved product data to the parent component
        onAdd(response.data);
        setProduct({
          id: 0,
          name: '',
          price: 0,
        });
      })
      .catch((error) => {
        console.error('Error saving product:', error);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleAddProduct}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
