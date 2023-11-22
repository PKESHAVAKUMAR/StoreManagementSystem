import "@fortawesome/fontawesome-free/css/all.css";
import '../Auth/auth.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const ProductList: React.FC = () => {  

  const navigate = useNavigate();  

  const [itemname, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [quantity, setquantity] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'itemname') {
      setName(value);
    } else if (name === 'Description') {
      setDescription(value);
    } else if (name === 'quantity') {
      setquantity(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/products/add', {
        itemname,
        Description,
        quantity,
      });
      //console.log('Product added successfully', response.data);
      if (response.data.token) {
        // Store the token in localStorage
        window.localStorage.setItem("token", response.data.token);
        console.log('add product successful', response.data);
        navigate("/ProductList");    //after successful signUp, Login page will be opened
      } else {
      console.error('Token not found in the response');
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  // // Use useEffect to attach event listeners after component rendering
  useEffect(() => {
    
    const container = document.getElementById('container');

    
  }, []);

  // ==========================================product========================================================
  // create product using localstorage token
  const [productitemname, setproductitemname] = useState('');
 const [productquantity, setproductquantity] = useState('');

  const handleproductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'productitemname') {
      setproductitemname(value);
    } else if (name === 'productquantity') {
      setproductquantity(value);
    }
  };

  //create a function for handle product with productitemname and productquantity without token
  const handleproductSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      await axios({
        method: 'post',
        url: 'http://localhost:8080/products/add',
        data: { itemname: productitemname, quantity: productquantity }
      })
        .then((res) => {
          console.log("product RESPONSE", res);
          navigate('/home')
        }).catch((err) => {
          alert(`Error ${err}`);
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-lg align-items-center justify-content-center" style={{ marginTop: "3%" }}>
      <div className="paddingcontainer" id="container">
        <div className="product-container">
          <form action="#" onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
                <h1>Add Product Details</h1>
                <input
                    type="text"
                    placeholder="Product Name"
                    name="itemname"
                    value={itemname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Decription"
                    name="Description"
                    value={Description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    required
                />
                <button type="submit">SUBMIT</button>
          </form>
        </div>        
        
      </div>
    </div>

  )
}

export default ProductList;