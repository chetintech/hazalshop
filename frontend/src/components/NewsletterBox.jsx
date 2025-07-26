import React from 'react'

const NewsletterBox = () => {
  
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className='text-center bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-8 rounded-2xl shadow-xl w-full max-w-8xl mx-auto mb-30'>
      <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-10'>
        Sanat yolculuğuna katıl, %20 indirim azan!
      </h2>

      <p className='text-gray-600 mt-6 max-w-md mx-auto leading-relaxed'>
        Sanat dünyasındaki yeniliklerden, özel fırsatlardan ve ilham verici içeriklerden haberdar olmak için bültenimize hemen abone ol! E-posta adresini bırak, ilk alışverişinde %20 indirim fırsatını kaçırma. Sanatın büyüsünü birlikte keşfedelim!
      </p>

      <form onSubmit={onSubmitHandler}>
        <div className='w-full max-w-xl flex items-center gap-2 mx-auto my-8 bg-white rounded-2xl p-2 shadow-lg border border-gray-200'>
          <input
            className='w-full px-4 py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent'
            type="email"
            placeholder='E-posta adresi'
            required
          />
          <button
            type='submit'
            className='flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
            Abone ol
          </button>
        </div>
      </form>
    </div>

  );
}
export default NewsletterBox

