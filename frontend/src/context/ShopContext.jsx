import { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = 'TL';
    const deliveryFee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    

    // Ürünleri API'den al
    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Kullanıcının sepetini backend'den al
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    // Ürün sepete ekle
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Beden seçiniz');
            return;
        }

        const cartData = JSON.parse(JSON.stringify(cartItems)); // structuredClone alternatifi

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    // Ürün adedini güncelle
    const updateQuantity = async (itemId, size, quantity) => {
        if (!itemId || !size || quantity < 0) return;

        const cartData = JSON.parse(JSON.stringify(cartItems)); // structuredClone alternatifi

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    // Sepetteki ürün sayısını hesapla (memoize edilmiş)
    const cartCount = useMemo(() => {
        let totalCount = 0;
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                const qty = cartItems[productId][size];
                if (qty > 0) totalCount += qty;
            }
        }
        return totalCount;
    }, [cartItems]);

    // Sepet toplam tutar (memoize edilmiş)
    const cartAmount = useMemo(() => {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const product = products.find(p => p._id === productId);
            if (!product) continue;

            for (const size in cartItems[productId]) {
                const quantity = cartItems[productId][size];
                if (quantity > 0) {
                    totalAmount += product.price * quantity;
                }
            }
        }
        return totalAmount;
    }, [cartItems, products]);

    // Ürünleri yükle
    useEffect(() => {
        getProductData();
    }, []);

    // Token'ı localStorage'dan al ve sepeti getir
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, []);

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount: () => cartCount,
        updateQuantity,
        getCartAmount: () => cartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
