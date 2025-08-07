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

      <div className='my-10 flex flex-col md:flex-row gap-20'>
        <img className='w-full md:max-w-[450px] rounded-lg' src={assets.aboutUs} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#666666]'><strong className='text-black'>Vizyonumuz</strong>
          <p>Moda ve kaliteyi bir arada sunarak, müşterilerimizin kendilerini en iyi şekilde ifade edebilecekleri özgün ve yenilikçi giyim seçenekleriyle sektörde öncü bir marka olmak.
            Müşteri memnuniyetini ve sürdürülebilirliği esas alarak, her yaş ve tarzdan insana hitap eden, güvenilir ve ulaşılabilir moda deneyimleri yaratmak.
          </p>
          <strong className='text-black'>Misyonumuz</strong>
          <p>En kaliteli ve şık ürünleri, uygun fiyatlarla sunarak müşterilerimizin gardıroplarını zenginleştirmek.
            Modaya yön veren tasarımlar ve üstün hizmet anlayışıyla, alışverişi keyifli ve kolay hale getirmek.
            Çevreye duyarlı üretim ve tedarik süreçleriyle, sürdürülebilir bir moda sektörüne katkıda bulunmak.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Neden'} text2={'biz'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Deneyimle değişen hikayeler:</strong>
          <p className='text-[#666666]'>Müşterilerimizin ihtiyaç ve beklentilerini en iyi şekilde anlayan, sektörde uzun yıllara dayanan deneyimimizle kişiye özel çözümler sunuyoruz. Her alışverişte, farklı ve unutulmaz bir deneyim yaşamanız için çalışıyoruz.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Güven ve Kalite:</strong>
          <p className='text-[#666666]'>Ürünlerimizin kalitesine ve müşterilerimizin memnuniyetine verdiğimiz önemle, güvenilir bir marka olmanın gururunu taşıyoruz. Moda trendlerini takip ederken kalite standartlarımızdan asla ödün vermiyoruz.
</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <strong>Müşteri Odaklı Hizmet :</strong>
          <p className='text-[#666666]'>Sadece ürün satmak değil, müşterilerimizle güçlü bir bağ kurmak hedefimiz. Sorularınıza hızlı yanıt, satış sonrası destek ve samimi iletişimle alışverişinizi kolaylaştırıyoruz.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About

