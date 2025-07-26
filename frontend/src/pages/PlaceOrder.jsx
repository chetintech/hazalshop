import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')

  const { navigate } = useContext(ShopContext)



  return (
    <div className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t'>
       
      {/* Left Side */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[480px] bg-white p-8 rounded-lg shadow-md border border-gray-200'>
         
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'TESLİMAT'} text2={'BİLGİSİ'} />
        </div>
        
        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Ad' />
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Soyad' />
        </div>
        
        <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="email" placeholder='E-posta adresi' />
        
        <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Adres' />
        
        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Şehir' />
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='İlçe' />
        </div>
        
        <div className='flex gap-4'>
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="number" placeholder='Posta Kodu' />
          <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Ülke' />
        </div>
          
        <input className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="tel" id="phone" name="phone" placeholder="05xx xxx xx xx" pattern="[0]{1}[5]{1}[0-9]{9}" required />
      </div>
       
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
         
        <div className='mt-12 bg-white p-8 rounded-lg shadow-md border border-gray-200'>
          <Title text1={'ÖDEME'} text2={'YÖNTEMİ'} />
          
          {/* Payment Method Selection */}
          <div className='flex gap-4 flex-col lg:flex-row mt-8'>
            <div onClick={() => setMethod("mastercard")}
              className='flex items-center justify-center gap-3 border border-gray-300 cursor-pointer lg:w-[200px] h-[60px]
               rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 group '>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full group-hover:border-black ${ method === 'mastercard' ? 'bg-black' : '' } `}></p>
              <img className='mx-4 transition-all duration-200' src={assets.iconMastercardBlack} alt="" />
            </div>
             
            <div onClick={() => setMethod('visa')}
              className='flex items-center justify-center gap-3 border border-gray-300 cursor-pointer lg:w-[200px] h-[60px]
               rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 group'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full group-hover:border-black ${ method === 'visa' ? 'bg-black' : '' } `}></p>
              <img className='mx-4 transition-all duration-200' src={assets.iconVisa} alt="" />
            </div>
             
            <div onClick={() => setMethod('kapidaOdeme')}
              className='flex items-center justify-center gap-3 border border-gray-300 cursor-pointer lg:w-[200px] h-[60px] rounded-full
               hover:border-black hover:bg-gray-50 transition-all duration-200 group'>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full group-hover:border-black ${ method === 'kapidaOdeme' ? 'bg-black' : '' } `}></p>
              <p className='text-[#666666] text-sm font-medium mx-4 group-hover:text-black transition-colors duration-200'>Kapıda Ödeme</p>
            </div>
          </div>
          
          {/* Place Order Button */}
          <button onClick={ () => navigate('/orders') } className='w-full mt-10 bg-black hover:bg-[#333333] text-white font-semibold py-4 px-6 rounded-full
           transition-all duration-200 transform hover:shadow-lg'>
            Siparişi Tamamla
          </button>
        </div>

      </div>
     </div>
  )
}

export default PlaceOrder


   