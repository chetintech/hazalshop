import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart, cartItems } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id == productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })

  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  // Sepetteki mevcut ürün miktarını hesapla
  const getCurrentCartQuantity = () => {
    if (!cartItems || !productId || !size) return 0
    return cartItems[productId]?.[size] || 0
  }

  // Sepete ekleme işlemi
  const handleAddToCart = async () => {
    if (!size) {
      alert('Lütfen bir beden seçin!')
      return
    }

    setIsAdding(true)
    
    try {
      await addToCart(productData._id, size)
      
      // Başarı mesajını göster
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
      
    } catch (error) {
      console.error('Sepete ekleme hatası:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const currentQuantity = getCurrentCartQuantity()

  return productData ? (
    <div className='border-t border-black/10 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Başarı Mesajı */}
      {showSuccess && (
        <div className='fixed top-26 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'>
          ✓ Sepete eklendi!
        </div>
      )}

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>

            <img className='w-3 5' src={assets.iconStarFilled} />
            <img className='w-3 5' src={assets.iconStarFilled} />
            <img className='w-3 5' src={assets.iconStarFilled} />
            <img className='w-3 5' src={assets.iconStarFilled} />
            <img className='w-3 5' src={assets.iconStarEmpty} />
            <p className='pl-2'>(122)</p>

          </div>
          <p className='mt-5 text-3xl font-medium'>{productData.price} {currency}</p>
          <p className='mt-5 text-[#666666] md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)} 
                  className={`border py-2 px-4 bg-gray-100 rounded-lg transition-colors ${item === size ? 'border-black bg-black text-black' : 'hover:bg-gray-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Sepetteki miktar göstergesi */}
          {currentQuantity > 0 && size && (
            <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
              <p className='text-green-700 text-sm'>
                🛒 Sepetinizde bu üründen {currentQuantity} adet var
              </p>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            disabled={isAdding || !size}
            className={`px-8 py-3 text-sm rounded-full transition-all duration-200 ${
              isAdding 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : !size
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'
            }`}
          >
            {isAdding ? (
              <span className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Ekleniyor...
              </span>
            ) : currentQuantity > 0 && size ? (
              `Sepete Ekle`
            ) : (
              'Sepete Ekle'
            )}
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-[#666666] mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <strong className='border px-5 py-3 text-sm'>Description</strong>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-[#666666]'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda ipsam sapiente tenetur numquam maxime expedita voluptas repudiandae mollitia eaque rem earum asperiores, est et provident fugit vero! Harum, consequatur consequuntur?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi vel quas optio sunt, soluta sapiente molestias eos asperiores quia, odio libero laborum, quae ab fugit! Doloremque incidunt cumque numquam!</p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0' ></div>
}

export default Product