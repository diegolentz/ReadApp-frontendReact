import './login.css'
import { User } from '../../domain/loginJSON'
import { useForm } from 'react-hook-form'
import { userService } from '../../service/userService'
import { ErrorResponse, mostrarMensajeError } from '../../error-handling'
import { useState } from 'react'

export const CreateAccount = ({changePage} : {changePage :() => void}) => {
    const {register,handleSubmit,formState : {errors},watch} = useForm()
    const [errorMessage, setErrorMessage] = useState('')

    const email    : string = watch('email')
    const username : string = watch('username')
    const password : string = watch('password')
    const name     : string = watch('name')

    const nuevoUsuario : User = new User(email,username,password,name)
    const createRequest  = nuevoUsuario.buildCreateAccountRequest()
    const create = async () => {
        try{
            if(validacion()){
                setErrorMessage("Please fill in both fields.");   
                return
            }
            const create = await userService.create(createRequest)
            alert("Account created successfully")
            changePage()
        }catch(error:unknown){
            mostrarMensajeError(error as ErrorResponse,setErrorMessage)
        }
    }

    const validacion = () : boolean =>!email || !username || !password || !name

    const customSubmit = (data: unknown) => {
        console.log(data)
    }

    return <>

        <main className="fondo-background">
           
           <div className=" form__container ">
               <div className="encabezado ">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path></svg>
                   <h1>ReadApp</h1> 
                </div>

            <form onSubmit={ handleSubmit(customSubmit) } id="loginForm" className="form__inputs borde--iluminado" action="/submit-login" method="post">
                
                <div className="campo">
                    <input type="email" {...register('email',{
                        required : true,
                        maxLength: 25,
                        pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/, // Expresión regular para verificar el formato del correo
                            message: 'El correo debe contener un "@" y un dominio válido', // Mensaje de error para formato incorrecto
                          }
                        })}/> 
                    {errors.email?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.email?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    {/* {errors.email?.type === "pattern" && <div className="input__required"><span>{errors.email.message}</div>}     */}


                    <label >email</label>
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
                    {errors.password?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.password?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    <label >Password</label>
                </div>

                <div className="campo">
                    <input type="text" {...register('name',{required:true})}/>
                    {errors.name?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.name?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    <label >Name</label>
                </div>

                <div className='actions'>

                    <button type='submit' className='valid button-login' onClick={create} >
                        <img src="src/assets/sign-in.svg" alt=""/>
                        <p>Create Account</p>
                    </button>

                    <button className="valid button-passwordRecovery" onClick={changePage}>
                        <img src="src/assets/key-return.svg" alt=""/>
                        <p>Back to login</p>
                    </button>
                </div>
            </form> 
            </div>

        </main>
    </>
} 