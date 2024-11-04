import './login.css'
import { User } from '../../domain/loginJSON'
import { useForm } from 'react-hook-form'

export const CreateAccount = () => {
    const {register,handleSubmit,formState : {errors},watch} = useForm()

    const email    : string = watch('email')
    const username : string = watch('username')
    const password : string = watch('password')
    const name     : string = watch('name')

    const usuario : User = new User(email,username,password,name)


    const create = () => {

    }

    const customSubmit = (data: unknown) => {
        console.log(data)
    }

    return <>
        <form onSubmit={ handleSubmit(customSubmit) } id="loginForm" className="form__inputs borde--iluminado" action="/submit-login" method="post">
                
                <div className="campo">
                    <input type="email" {...register('email',{
                        required : true,
                        maxLength: 15})}/> 
                    {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}    

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
                    {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    <label >Password</label>
                </div>

                <div className="campo">
                    <input type="text" {...register('name',{required:true})}/>
                    {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                    {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                    <label >Name</label>
                </div>

                <div className='actions'>

                    <button type='submit' className='valid button-login' onClick={create} >
                        <img src="src/assets/sign-in.svg" alt=""/>
                        <p>Create Account</p>
                    </button>

                    <button className="valid button-passwordRecovery">
                        <img src="src/assets/key.svg" alt=""/>
                        <p>Back to login</p>
                    </button>
                </div>
            </form> 
    </>
} 