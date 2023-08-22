import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/simgUp-login.jpg'

const Login = () => {
    const {error,loading,singIn,user} = useAuth()
    const {handleSubmit,register,reset,formState:{errors}} = useForm()
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const onSub = (_bodyData) =>{
        singIn(_bodyData)
        nav('/')
    }
    const nav = useNavigate()
    useEffect(()=>{
      reset()
    },[])

  return (
    
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage:`url(${logo})`}}>
        <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-blur-sm">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleSubmit(onSub)} className="space-y-4 md:space-y-6" action="#">
              {error && <p className='m-0 text-red-600'>{error}</p>}
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input {...register('email',{
                        required:{value:true,message:"email is required"},
                        pattern:{value:emailReg,message:"invalid email"}
                    })} type="email" name="email"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                    {errors.email && <p className='m-0 text-red-600'>{errors.email.message}</p>}
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input {...register('password',
                      {
                        required:{value:true, message :"password is required"},
                        minLength:{value:3, message:"min 6 chars..."},
                        maxLength:{value:200, message:"max 200 chars..."}
                      })} type="password"  name="password"  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      {errors.password && <p className='m-0 text-red-600'>{errors.password.message}</p>}
                  </div>
                  <button  type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet? <Link to='/signUp' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Login