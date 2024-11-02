import { Link } from 'react-router-dom'
import './login.css'
//import { useEffect, useState } from 'react'


export const Login = () => {

    return <>
        <main className="fondo-background">
        
        <div className=" form__container ">
            <form id="loginForm" className="form__inputs borde--iluminado" action="/submit-login" method="post">
                <div className="encabezado ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>
                    <h1>ReadApp</h1> 
                </div>
                <div className="campo ">
                    <input type="text" id="username" name="username"  required />
                    <label >Username</label>
                    <div className="input__required">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" fill="#000000" viewBox="0 0 256 256">
                            <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                        </svg>
                        <span>El nombre de usuario es obligatorio</span>
                    </div>
                </div>
        
                <div className="campo">
                    <input type="password" id="password" name="password"/>

                    <label >Password</label>
                </div>

                <div className='actions'>

                <Link className='valid button-login' to="/home">
                    <button   >
                        <img src="src/assets/sign-in.svg" alt=""/>
                        <p>Login</p>
                    </button>
                </Link>
                
                <button className="valid button-newAccount" >
                    <img src="src/assets/user-circle.svg" alt=""/>
                    <p>New account</p>
                </button>

                <button className="valid button-passwordRecovery">
                    <img src="src/assets/key.svg" alt=""/>
                    <p>Password Recovery</p>
                </button>
                </div>
            </form> 
            
        </div>
    </main>
    </>
    
}