import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-black'>
          <div>
              <img src={assets.exchangeIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>Kolay değişim politikası</p>
              <p className='text-[#666666]'>Sorunsuz değişim politikası sunuyoruz.</p>
          </div>

          <div>
              <img src={assets.successIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>7 Günlük iade politikası</p>
              <p className='text-[#666666]'>7 günlük ücretsiz iade politikası sunuyoruz.</p>
          </div>

          <div>
              <img src={assets.customerServiceIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>En iyi müşteri desteği</p>
              <p className='text-[#666666]'>7/24 müşteri desteği sağlıyoruz</p>
          </div>
    </div>
  )
}

export default OurPolicy
