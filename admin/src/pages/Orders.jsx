import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '@/App'
import { toast } from 'react-toastify'
import { assets } from '@/assets/assets'

// Türkçe status seçenekleri
const STATUS_OPTIONS = [
  'Sipariş Verildi',
  'Paketleniyor', 
  'Kargoya Verildi',
  'Yola Çıktı',
  'Teslim Edildi'
]

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) {
      setLoading(false)
      toast.error('Token bulunamadı. Lütfen tekrar giriş yapın.')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      response.data.success
        ? setOrders(response.data.orders)
        : toast.error(response.data.message)
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.')
      } else {
        toast.error(error.response?.data?.message || error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value }, // Artık Türkçe değer gönderiliyor
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      await fetchAllOrders()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  // Status rengini belirleyen fonksiyon
  const getStatusColor = (status) => {
    switch (status) {
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800'
      case 'Yola Çıktı':
        return 'bg-blue-100 text-blue-800'
      case 'Kargoya Verildi':
        return 'bg-purple-100 text-purple-800'
      case 'Paketleniyor':
        return 'bg-yellow-100 text-yellow-800'
      case 'Sipariş Verildi':
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-sm text-gray-500">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Siparişler</h1>
          <p className="text-gray-600">Tüm siparişlerinizi buradan yönetebilirsiniz</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz sipariş yok</h3>
            <p className="text-gray-500">Siparişler geldiğinde burada görünecek</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <img src={assets.parcel_icon} alt="Paket" className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Sipariş İçeriği</h4>
                            <div className="space-y-1">
                              {order.items?.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center text-sm text-gray-600">
                                  <span className="font-medium">{item.name}</span>
                                  <span className="mx-1">×</span>
                                  <span>{item.quantity}</span>
                                  {item.size && (
                                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                                      {item.size}
                                    </span>
                                  )}
                                  {itemIndex < order.items.length - 1 && <span className="ml-1">,</span>}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Teslimat Adresi</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="font-medium">
                                {order.address?.firstName} {order.address?.lastName}
                              </p>
                              <p>{order.address?.street}</p>
                              <p>
                                {order.address?.city}, {order.address?.state} {order.address?.zipcode}
                              </p>
                              <p>{order.address?.country}</p>
                              <p className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {order.address?.phone}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ürün Sayısı:</span>
                              <span className="font-medium">{order.items?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ödeme Yöntemi:</span>
                              <span className="font-medium">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ödeme Durumu:</span>
                              <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                                {order.payment ? 'Tamamlandı' : 'Bekliyor'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tarih:</span>
                              <span className="font-medium">{new Date(order.date).toLocaleString('tr-TR')}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <span className="text-gray-900 font-medium">Toplam:</span>
                              <span className="text-lg font-bold text-gray-900">
                                {order.amount}{currency}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sipariş Durumu</label>
                            <select
                              value={order.status}
                              onChange={(e) => statusHandler(e, order._id)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex justify-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders