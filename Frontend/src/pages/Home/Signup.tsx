import "@fortawesome/fontawesome-free/css/all.css";
import '../Auth/auth.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        username,
        email,
        password,
      });
      //console.log('Signup successful', response.data);
      if (response.data.token) {
        // Store the token in localStorage
        window.localStorage.setItem("token", response.data.token);
        console.log('Signup successful', response.data);
        navigate("/Login");    //after successful signUp, Login page will be opened
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

  //create a function for handle login with loginUsername and loginPassword without token
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      await axios({
        method: 'post',
        url: 'http://localhost:8080/users/login',
        data: { username: loginUsername, password: loginPassword }
      })
        .then((res) => {
          console.log("LOGIN RESPONSE", res);
          navigate('/home')
        }).catch((err) => {
          alert(`Error ${err}`);
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: "3%" }}>
      <div className="authcontainer" id="container">
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleSubmit} >
                <h1>Create Account</h1>
                <input
                    type="text"
                    placeholder="Name"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">SUBMIT</button>
          </form>
        </div>
        

        <div className="overlay-panel overlay-right">
            <h1>New User</h1>
            <p>Click below button for Registration</p>
            <button className="btn-primary" id="signUp">Sign Up</button>
        </div>

        <div className="overlay-panel overlay-left">
            <h1>STORE MANAGEMENT SYSTEM</h1>
            <p>NEW USER SIGN UP</p>
            <button className="btn-primary invisible" id="signIn">Sign In</button>
        </div>
        
      </div>
    </div>

  )
}

export default Auth;