import { backendUrl, currency } from '@/App'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchList = async () => {
    setLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Tüm Ürünler</h2>
        <p className="text-sm text-gray-600 mt-1">{list.length} ürün listeleniyor</p>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden lg:grid grid-cols-[80px_1fr_120px_150px_80px] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
        <span>Görsel</span>
        <span>Ürün Bilgileri</span>
        <span>Fiyat</span>
        <span>Kategori</span>
        <span className="text-center">İşlem</span>
      </div>

      {/* Product List */}
      <div className="divide-y divide-gray-100">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H4" />
              </svg>
            </div>
            <p className="text-lg font-medium">Henüz ürün bulunmuyor</p>
            <p className="text-sm mt-1">Yeni ürünler ekleyerek başlayın</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div key={item._id} className="group hover:bg-gray-50 transition-colors duration-200">
              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-[80px_1fr_120px_150px_80px] gap-4 px-6 py-4 items-center">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={item.image[0]} 
                    alt={item.name} 
                    className="w-14 h-14 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" 
                  />
                </div>
                
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {item._id.slice(-6)}</p>
                </div>
                
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{item.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{currency}</span>
                </div>
                
                <div>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 flex items-center justify-center group/btn"
                    title="Ürünü sil"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image[0]} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 truncate pr-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">ID: {item._id.slice(-6)}</p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="font-semibold text-gray-900">
                            {item.price} {currency}
                          </span>
                          <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeProduct(item._id)}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 flex items-center justify-center ml-2"
                        title="Ürünü sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List