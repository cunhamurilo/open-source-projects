import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

import logo from '../../assets/images/netflix-logo.png'

import AuthService from '../../services/api';

import './styles.css';

export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorAuth, setErrorAuth] = useState('');
    const [remember, setRemember] = useState(false);
    
    // Check if user exist in database
    function checkAuth () {
        AuthService.login(username, password, remember).then(() => {
            history.push('/home');
            setErrorAuth('');
        },error => {
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setErrorAuth(resMessage);
        });
    };

    // Check if user already logged
    useEffect(() => {

        const currentUser = AuthService.getCurrentUser();
        if (currentUser){
            history.push('/home')
        }
            
    }, [history]);

    return (
        <div id="page-sign-in">
            <div className="sign-in-container">
                {/* Logo netflix */}
                <div className='logo-container'>
                    <img src={logo} alt='Challenge Netflix'/>
                </div>
                {/* Content of login page */}
                <div id="page-sign-in-content" className='container'> 
                    <div className="content">
                        <div className='sign-in-text'>
                            Sign In
                        </div>

                        {/* Input with username and password */}
                        <p className='error-sign-in'>{errorAuth}</p>

                        <div className='input-container'>
                            <Input 
                                onChange={ (event) => setUsername(event.target.value) }
                                id='username'
                                label='Username'
                                type='text'
                            />
                            <Input 
                                onChange={ (event) => setPassword(event.target.value) }
                                id='password'
                                label='Password'
                                type='password'
                            />
                        </div>

                        {/* Buttons */}
                        <div className='buttons-container'>
                            <button onClick={() => checkAuth()}>
                                    Sign in
                            </button>
                            <Checkbox 
                                id='remember'
                                label='Remember me'
                                defaultChecked={remember}
                                setChecked={setRemember}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}