import orderModel from "../models/orderModels.js"
import userModel from "../models/userModel.js"

// Placing orders using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()

    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })
    res.json({ success: true, message: "Sipariş Verildi" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {

}

// Placing orders using razorpay method
const placeOrderRazorPay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body

    const orders = await orderModel.find({ userId })

    res.json({
      success: true,
      orders
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Durum güncellendi' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus }