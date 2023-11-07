import "@fortawesome/fontawesome-free/css/all.css";
import '../Auth/auth.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Auth: React.FC = () => {
  const navigate = useNavigate();
  
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


  // ... (rest of the component remains the same)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        username,
        email,
        password,
      });
      // console.log('Signup successful', response.data);
      //navigate("/Dashboard");
      if (response.data.token) {
        // Store the token in localStorage
        window.localStorage.setItem("token", response.data.token);

        console.log('Signup successful', response.data);
        
       // navigate("/Dashboard");
      } else {
        console.error('Token not found in the response');
      }
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  // // Use useEffect to attach event listeners after component rendering
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signUpButton.addEventListener('click', () => {
        container.classList.remove('move-back');
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });

      signInButton.addEventListener('click', () => {
        container.classList.add('move-back');
      });
    }
  }, []);

  // ==========================================Login========================================================
  // create login login using localstorage token
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'loginUsername') {
      setLoginUsername(value);
    } else if (name === 'loginPassword') {
      setLoginPassword(value);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {  
    e.preventDefault();  
    try {      
          await axios({
          method: 'post',
          url: 'http://localhost:8080/users/login',
          data: { username: loginUsername, password: loginPassword }
        })
        .then((res) => {
          console.log("LOGIN RESPONSE", res);
          toast.success('Login successful', {
            position: 'top-right',
            autoClose: 3000,           
          });
          navigate("/Dashboard");          
        }).catch((err) => {
            toast.error(`Error: ${err.response ? err.response.data : err.message}`, {
            position: 'top-right',
            autoClose: 5000,
          });
        })
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      // Customize the user-friendly error message
      let errorMessage = 'An error occurred';
    
        toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
    
  };
  

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: "3%" }}>
      <div className="authcontainer" id="container">
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleLoginSubmit}>
            <h1>Sign In</h1>
            <span>If Already a Registered User,<br/>Enter Details</span>
            <input type="text" placeholder="Username" name="loginUsername" value={loginUsername} onChange={handleLoginChange} />
            <input type="password" placeholder="Password" name="loginPassword" value={loginPassword} onChange={handleLoginChange} />
            <a href="#">Forgot your password?</a>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us, please login with your personal info</p>
          <button className="ghost" id="signIn">Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>WELCOME <br/>TO</h1>
          <h1>STORE MANAGEMENT SYSTEM</h1>
          {/* <p>Login to your Account</p> */}
          {/* <button className="ghost" id="signUp">Sign Up</button> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth;
