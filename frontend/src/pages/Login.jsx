import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign up')

   const onSubmitHandler = async (event) => {
    event.preveventDefault()
  }

  return (
    <form onSubmit={ onSubmitHandler } className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>
          {currentState === 'Login' ? 'Giriş yap' : 'Üye ol'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-[#666666]' />

      </div>
      { currentState === 'Login' ? '' : <input className=' w-full px-3 py-2 border border-[#666666] rounded-full' type="text" placeholder='Ad' required />}
      <input className='w-full px-3 py-2 border border-[#666666] rounded-full' type="email" placeholder='E-posta' required />
      <input className='w-full px-3 py-2 border border-[#666666] rounded-full' type="password" placeholder='Şifre' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Şifremi unuttum</p>
        {
          currentState === 'Login'
            ? <p onClick={ () => setCurrentState('Sign up') } className='cursor-pointer'>Hesap oluştur</p>
            : <p onClick={ () => setCurrentState('Login') } className='cursor-pointer'>Giriş yap</p>
            
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-full'>{ currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>


    </form>
  )
}

export default Login
