import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='my-10 text-sm'>
            <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-14 mt-20'>
                <div>
                    <img src={assets.logo} className='mb-5' alt="Logo" />
                    <p className='w-full md:w-2/3 text-[#666666]'>
                        Sanat eserlerinin en kaliteli koleksiyonunu sunan platformumuzda,
                        her zevke uygun benzersiz parçaları keşfedin.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Kurumsal</p>
                    <ul className='flex flex-col gap-1 text-[#666666]'>
                        <li>Ana Sayfa</li>
                        <li>Hakkımızda</li>
                        <li>Sipariş</li>
                        <li>Gizlilik Politikası</li>
                    </ul>
                </div>

                 <div>
                    <p className='text-xl font-medium mb-5'>Kurumsal</p>
                    <ul className='flex flex-col gap-1 text-[#666666]'>
                        <li>Ana Sayfa</li>
                        <li>Hakkımızda</li>
                        <li>Sipariş</li>
                        <li>Gizlilik Politikası</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>İletişime Geçin</p>
                    <ul className='flex flex-col gap-1 text-[#666666]'>
                        <li>+90 555 555 55 55</li>
                        <li>contact@art.com</li>
                    </ul>
                </div>
            </div>

            <div className='mt-10'>
                <hr className='border-black/10' />
                <p className='py-5 text-center text-[#666666]'>© 2025 art.com - Tüm haklar saklıdır.</p>
            </div>
        </div>
    )
}

export default Footer


