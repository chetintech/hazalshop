import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext) 

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


   const onSubmitHandler = async (event) => {
     event.preventDefault()
     
     try {
       if (currentState === 'Sign Up') {
         const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

         if (response.data.success) {
           setToken(response.data.token)
           localStorage.setItem('token', response.data.token)
         } else {
           toast.error(response.data.message)
         }
       } else {
         const response = await axios.post(backendUrl + '/api/user/login', { email, password })
         if (response.data.success) {
           setToken(response.data.token) 
           localStorage.setItem('token', response.data.token)
         } else {
           toast.error(response.data.message)
         }
       }

     } catch (error) {
       console.log(error)
       toast.error(error.message)
     }
   }
  
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={ onSubmitHandler } className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>
          {currentState === 'Login' ? 'Giriş yap' : 'Üye ol'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-[#666666]' />

      </div>
      { currentState === 'Login' ? '' : <input  onChange={(e) => setName(e.target.value)} value={name} className=' w-full px-3 py-2 border border-[#666666] rounded-full' type="text" placeholder='Ad' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-[#666666] rounded-full' type="email" placeholder='E-posta' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-[#666666] rounded-full' type="password" placeholder='Şifre' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Şifremi unuttum</p>
        {
          currentState === 'Login'
            ? <p onClick={ () => setCurrentState('Sign Up') } className='cursor-pointer'>Hesap oluştur</p>
            : <p onClick={ () => setCurrentState('Login') } className='cursor-pointer'>Giriş yap</p>
            
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-full'>{ currentState === 'Login' ? 'Giriş yap' : 'Kayıt ol'}</button>


    </form>
  )
}

export default Login
