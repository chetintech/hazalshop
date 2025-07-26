import { assets } from '@/assets/assets'
import NewsletterBox from '@/components/NewsletterBox'
import Title from '@/components/Title'
import React from 'react'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text2={'Hakkımızda'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.aboutUs} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#666666]'><strong className='text-black'>Vizyonumuz</strong>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eum odio, dolorem, quibusdam quisquam omnis ex sint id cupiditate quas quos dolores! Sint quae cumque saepe illum harum laudantium quam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolor odit a, ut molestiae optio fuga sunt. Dicta at expedita, quo nostrum cupiditate, reiciendis porro vel accusantium cumque mollitia officia!</p>
          <strong className='text-black'>Misyonumuz</strong>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt placeat rem cum dolorum provident vero earum sequi laboriosam nemo molestiae soluta, numquam harum vitae commodi quaerat quos, ipsa, nesciunt obcaecati.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Neden'} text2={'biz'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Deneyimle değişen hikayeler:</strong>
          <p className='text-[#666666]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint neque labore facere a quam saepe minima suscipit? In facilis nisi iste sed quia? Autem adipisci iure, temporibus fuga vero molestias.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Deneyimle değişen hikayeler:</strong>
          <p className='text-[#666666]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint neque labore facere a quam saepe minima suscipit? In facilis nisi iste sed quia? Autem adipisci iure, temporibus fuga vero molestias.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Deneyimle değişen hikayeler:</strong>
          <p className='text-[#666666]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint neque labore facere a quam saepe minima suscipit? In facilis nisi iste sed quia? Autem adipisci iure, temporibus fuga vero molestias.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About

