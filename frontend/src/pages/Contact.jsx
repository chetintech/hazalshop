import { assets } from '@/assets/assets'
import NewsletterBox from '@/components/NewsletterBox'
import Title from '@/components/Title'
import React from 'react'

const Contact = () => {
  const handleCallClick = () => {
    window.location.href = 'tel:+905555555555'
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'İletişime '} text2={'geç'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contactUs} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-black'>Mağazamız</p>
          <p className='font-semibold text-[#666666]'>Güzeltepe Mah. Osmanpaşa Cad. No:100 <br />  Eyüpsultan/İstanbul</p>
          <p className='font-semibold text-[#666666]'>Tel: +90 555 555 55 55 <br /> E-posta: info@hazalshop.com</p>
          <button 
            onClick={handleCallClick}
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-full'
          >
            İletişime Geç
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact