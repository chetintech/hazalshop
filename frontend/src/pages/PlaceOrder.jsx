import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal.jsx';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
  // Context values
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee, products } = useContext(ShopContext);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [method, setMethod] = useState('cod');

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {

      const orderItems = Object.entries(cartItems).flatMap(([productId, sizes]) => {
        const productInfo = products.find(p => p._id === productId);
        if (!productInfo) return [];


        return Object.entries(sizes)
          .filter(([, quantity]) => quantity > 0)
          .map(([size, quantity]) => ({
            ...structuredClone(productInfo),
            size,
            quantity,
          }));
      });

      if (orderItems.length === 0) {
        toast.info("Sepetiniz boş. Sipariş vermeden önce ürün ekleyin.");
        setIsLoading(false);
        return;
      }


      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      let response;
      switch (method) {
        case 'cod':
          console.log("Sending Order Data:", orderData);
          response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          break;

        case 'mastercard':
        case 'visa':
          toast.info("Bu ödeme yöntemi henüz aktif değil");

          break;
        default:
          toast.warn("Please select a valid payment method.");
          return; // Exit if no valid method is selected
      }

      if (response && response?.data?.success) {
        toast.success("Sipariş başarıyla verildi!");
        setCartItems({}); // Clear the cart
        navigate('/orders'); // Navigate to the user's orders page
      } else if (response) {
        console.log("API Response:", response.data);
        toast.error(response.data.message || "Failed to place order. Please try again.");
      }

    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('An error occurred while placing your order.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left Side: Delivery Information */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[480px] bg-white p-8 rounded-lg shadow-md border border-gray-200'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'TESLİMAT'} text2={'BİLGİSİ'} />
        </div>

        <div className='flex gap-4'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Ad' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Soyad' required />
        </div>

        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="email" placeholder='E-posta adresi' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Adres' required />

        <div className='flex gap-4'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Şehir' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='İlçe' required />
        </div>

        <div className='flex gap-4'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="number" placeholder='Posta Kodu' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="text" placeholder='Ülke' required />
        </div>

        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:border-black focus:outline-none transition-all duration-200 placeholder-gray-500 bg-white text-black' type="tel" id="phone" placeholder="05xx xxx xx xx" pattern="[0]{1}[5]{1}[0-9]{9}" required />
      </div>

      {/* Right Side: Cart and Payment */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12 bg-white p-8 rounded-lg shadow-md border border-gray-200'>
          <Title text1={'ÖDEME'} text2={'YÖNTEMİ'} />

          {/* Payment Method Selection */}
          <div className='flex gap-4 flex-col lg:flex-row mt-8'>
            <div onClick={() => setMethod("mastercard")} className={`flex items-center justify-center gap-3 border cursor-pointer lg:w-[200px] h-[60px] rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 group ${method === 'mastercard' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full group-hover:border-black ${method === 'mastercard' ? 'bg-black border-black' : 'border-gray-400'}`}></p>
              <img className='mx-4' src={assets.iconMastercardBlack} alt="Mastercard" />
            </div>

            <div onClick={() => setMethod('visa')} className={`flex items-center justify-center gap-3 border cursor-pointer lg:w-[200px] h-[60px] rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 group ${method === 'visa' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full group-hover:border-black ${method === 'visa' ? 'bg-black border-black' : 'border-gray-400'}`}></p>
              <img className='mx-4' src={assets.iconVisa} alt="Visa" />
            </div>

            <div onClick={() => setMethod('cod')} className={`flex items-center justify-center gap-3 border cursor-pointer lg:w-[200px] h-[60px] rounded-full hover:border-black hover:bg-gray-50 transition-all duration-200 group ${method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full group-hover:border-black ${method === 'cod' ? 'bg-black border-black' : 'border-gray-400'}`}></p>
              <p className='text-[#666666] text-sm font-medium mx-4 group-hover:text-black transition-colors duration-200'>Kapıda Ödeme</p>
            </div>
          </div>

          {/* Place Order Button with Loading State */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full mt-10 bg-black hover:bg-[#333333] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed'>
            {isLoading ? 'Sipariş Veriliyor...' : 'Siparişi Tamamla'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
