//import { Link } from 'react-router-dom'
import './login.css'
//import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useEffect } from 'react'
// import { userService } from '../../service/userService'
import { User } from '../../domain/loginJSON'
import { userService } from '../../service/userService'

export const Login = () => {
    const {register,handleSubmit,formState : {errors},watch} = useForm()

    
        const username : string = watch('username')
        const password : string = watch('password')
        
        const usuario : User = new User(username,password)
        const loginRequest = usuario.buildLoginRequest()
        
    
    
    const login = async ()  =>{
        const login = await userService.login(loginRequest) 
    }
    

    const customSubmit = (data: unknown) => {
        console.log(data)
    }

    return <>
        <main className="fondo-background">
        
        <div className=" form__container ">
            <form onSubmit={ handleSubmit(customSubmit) } id="loginForm" className="form__inputs borde--iluminado" action="/submit-login" method="post">
                <div className="encabezado ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>
                    <h1>ReadApp</h1> 
                </div>
                
                <div className="campo ">
                    <input type="text" {...register('username',{
                        required : true,
                        maxLength: 15})}/> 
                    {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}    

                    <label >Username</label>
                </div>
        
                <div className="campo">
                    <input type="password" {...register('password',{required:true})}/>
                    {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    <label >Password</label>
                </div>

                <div className='actions'>


                {/* <Link className='valid button-login' to="/home"> */}
                <button type='submit' onClick={login} >
                    <img src="src/assets/sign-in.svg" alt=""/>
                    <p>Login</p>
                </button>
                
                {/* </Link> */}
                
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