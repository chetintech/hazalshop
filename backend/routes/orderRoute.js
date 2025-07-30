import express from 'express'
import { allOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'


const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/place', authUser, placeOrderRazorPay)

// User feature
orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter
