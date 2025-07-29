import { backendUrl, currency } from '@/App'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { headers: { token } })
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Bir hata oluştu');
    }
  }

  useEffect(() => {
    fetchList()
  }, [token])

  return (
    <>
      <p className='mb-2'>Tüm ürünler</p>
      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <span>Görsel</span>
          <span>İsim</span>
          <span>Fiyat</span>
          <span>Kategori</span>
          <span className='text-center'>İşlemler</span>
        </div>

        {
          list.map((item, index) => {
            return (
              <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border'>
                <img src={item.image[0]} alt={item.name} className='w-12 h-12 object-cover' />
                <p>{item.name}</p>
                <p>{item.price} {currency}</p>
                <p>{item.category}</p>
                <div className='text-center'>
                  <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-gray-500'>X</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default List
