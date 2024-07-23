import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Navigate to the signup page
        navigate('/signup');
        console.log('Logging in with:', loginUsername, loginPassword);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="body">
            <div className="form-container">
                <div className="login-page">
                    <div className="form">
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required
                            />
                            <div className="password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button type="submit">Login</button>
                            <p className="message">
                                Not registered? <Link to="/signup">Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
