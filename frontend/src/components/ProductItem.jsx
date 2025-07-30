import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext)


    return (
        <Link className='text-[#666666] cursor-pointer' to= {`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='w-full h-64 object-cover object-top rounded-lg hover:scale-110 transition ease-in-out duration-300'
 src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{price} {currency}</p>
        </Link>
    )
}
export default ProductItem
