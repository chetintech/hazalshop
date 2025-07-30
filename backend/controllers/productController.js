import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModels.js"

// Function for add product
const addProduct = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug: Log the incoming request body

        const {
            name,
            description,
            price,
            category,
            subCategory = '',
            sizes = [], // Default to empty array if sizes is not provided
            bestseller
        } = req.body;

        // Zorunlu alanları kontrol et
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price, and category are required fields"
            });
        }

        const numericPrice = Number(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid positive number"
            });
        }

        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }

        const imageFields = ['image1', 'image2', 'image3', 'image4'];
        const images = imageFields
            .map(field => req.files[field]?.[0])
            .filter(Boolean); // undefined olmayanları al

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }

        // Cloudinary'e yükle
        let imageUrls = [];
        try {
            imageUrls = await Promise.all(
                images.map(async (img) => {
                    if (!img.path) throw new Error("Invalid image file");

                    const result = await cloudinary.uploader.upload(img.path, {
                        resource_type: 'image',
                        folder: 'products',
                        transformation: [
                            { width: 800, height: 800, crop: 'limit' },
                            { quality: 'auto' }
                        ]
                    });

                    return result.secure_url;
                })
            );
        } catch (uploadError) {
            console.error('Image upload error:', uploadError);
            return res.status(500).json({
                success: false,
                message: "Failed to upload images. Please try again."
            });
        }

        // Sizes alanını dizi olarak işle
        let sizesArray = [];
        if (Array.isArray(sizes)) {
            sizesArray = sizes
                .map(s => String(s).trim())
                .filter(s => s.length > 0);
        } else if (typeof sizes === 'string' && sizes.trim().length > 0) {
            try {
                const parsed = JSON.parse(sizes);
                if (Array.isArray(parsed)) {
                    sizesArray = parsed
                        .map(s => String(s).trim())
                        .filter(s => s.length > 0);
                } else {
                    sizesArray = sizes
                        .split(',')
                        .map(s => s.trim())
                        .filter(s => s.length > 0);
                }
            } catch (e) {
                sizesArray = sizes
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
            }
        }

        console.log('Processed sizes:', sizesArray); // Debug: Log the processed sizes

        // Boyutları standart sıraya göre sırala
        const sizeOrder = ["S", "M", "L", "XL", "XXL"];
        sizesArray = sizesArray.sort((a, b) => {
            const indexA = sizeOrder.indexOf(a.toUpperCase());
            const indexB = sizeOrder.indexOf(b.toUpperCase());

            // Sıralamada olmayanlar sona atılır
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });


        const productData = {
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            subCategory: subCategory.trim(),
            price: numericPrice,
            sizes: sizesArray,
            bestseller: bestseller === "true" || bestseller === true,
            image: imageUrls,
            date: Date.now()
        };

        // Veritabanına kaydet
        try {
            const product = new productModel(productData);
            await product.save();

            return res.status(201).json({
                success: true,
                message: "Product added successfully",
                productId: product._id
            });

        } catch (dbError) {
            console.error('Database error:', dbError);

            if (dbError.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Product with this name already exists"
                });
            }

            if (dbError.name === 'ValidationError') {
                const errors = Object.values(dbError.errors).map(err => err.message);
                return res.status(400).json({
                    success: false,
                    message: `Validation failed: ${errors.join(', ')}`
                });
            }

            throw dbError;
        }

    } catch (error) {
        console.error('Unexpected error in addProduct:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
};




// Function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// Fuction for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Fuction for single product info 
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }