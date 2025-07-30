import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadOrderData = async () => {
    if (!token) return

    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrderItems = []

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })

        setOrderData(allOrderItems.reverse())
      } else {
        setError('Siparişler yüklenemedi.')
      }
    } catch (err) {
      setError('Siparişler yüklenirken hata oluştu.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Sayfa yüklendiğinde otomatik siparişleri çek
  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text2="Siparişlerim" />
      </div>

      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {orderData.length === 0 && !loading && <p>Henüz siparişiniz yok.</p>}

        {orderData.map((item) => (
          <div
            key={item._id || item.id || `${item.name}-${item.date}`} // varsa id kullan, yoksa name+date kombinasyonu
            className="py-4 border-t border-b text-[#666666] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-[#666666]">
                  <p>
                    {item.price} {currency}
                  </p>
                  <p>Adet: {item.quantity}</p>
                  <p>Beden: {item.size}</p>
                </div>
                <p className="mt-1">
                  Tarih:{' '}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Ödeme: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              {/* Buton işlevi belirsiz, eğer yeniden yüklemek içinse aktif. Aksi halde kaldırılabilir */}
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-full"
              >
                Siparişi takip et
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
