import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-black'>
          <div>
              <img src={assets.exchangeIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>Easy Exchange Policy</p>
              <p className='text-[#666666]'>We offer hassle free exchange policy</p>
          </div>

          <div>
              <img src={assets.successIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>7 Days return policy</p>
              <p className='text-[#666666]'>We provide 7 days free return policy</p>
          </div>

          <div>
              <img src={assets.customerServiceIcon} className='w-12 m-auto mb-5' alt="" />
              <p className='font-semibold'>Best customer support</p>
              <p className='text-[#666666]'>we provide 7/24 customer support</p>
          </div>
    </div>
  )
}

export default OurPolicy
