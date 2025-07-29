import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext)

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'Sipariş'} text2={'Özeti'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{getCartAmount()}.00 {currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{deliveryFee}.00 {currency}</p>

                </div>
                <hr />
                <div className='flex justify-between'>
                    <strong>Total</strong>
                    <strong>{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00 {currency}</strong>
                </div>

            </div>

        </div>
    )
}

export default CartTotal
