import { backendUrl } from '@/App';
import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Upload, X, Plus, Check } from 'lucide-react';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Erkek');
  const [subCategory, setSubCategory] = useState('Üst giyim');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeInMB = 5;
    if (!validTypes.includes(file.type)) {
      toast.error('Sadece JPEG, PNG veya GIF dosyaları yüklenebilir!');
      return false;
    }
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`Dosya boyutu ${maxSizeInMB}MB'dan büyük olamaz!`);
      return false;
    }
    return true;
  };

  const handleImageChange = (files) => {
    const selectedImages = Array.from(files).slice(0, 4);
    const validatedImages = [];

    for (const file of selectedImages) {
      if (validateImage(file)) {
        validatedImages.push(file);
      }
    }

    setImage1(validatedImages[0] || false);
    setImage2(validatedImages[1] || false);
    setImage3(validatedImages[2] || false);
    setImage4(validatedImages[3] || false);
  };

  const removeImage = (index) => {
    const setters = [setImage1, setImage2, setImage3, setImage4];
    setters[index](false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error('En az bir beden seçmelisiniz!');
      return;
    }

    if (parseFloat(price) <= 0) {
      toast.error('Fiyat sıfırdan büyük olmalıdır!');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller ? 'true' : 'false');
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Ürün başarıyla eklendi!');
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
        setCategory('Erkek');
        setSubCategory('Üst giyim');
      } else {
        toast.error(response.data.message || 'Ürün eklenemedi!');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Ürün eklenirken bir hata oluştu!';
      console.error('Hata:', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Yeni Ürün Ekle</h1>
            <p className="text-slate-300 mt-2">Mağazanıza yeni bir ürün ekleyin</p>
          </div>

          <form onSubmit={onSubmitHandler} className="p-8 space-y-8">
            {/* Image Upload Section */}
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-800">Ürün Fotoğrafları</h3>
                <span className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded-full">En fazla 4 adet</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[image1, image2, image3, image4].map((image, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden bg-white border-2 border-slate-200 hover:border-blue-300 transition-colors">
                      <img
                        className="w-full h-full object-cover"
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt={`Image ${i + 1}`}
                      />
                      {image && (
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 border-dashed rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-blue-700 font-medium">Fotoğraf Seç veya Sürükle</span>
                  <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full">JPG, PNG, GIF</span>
                </label>
              </div>
            </div>

            {/* Product Info Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Ürün Adı</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white shadow-sm"
                    type="text"
                    placeholder="Ürün adını girin..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Ürün Açıklaması</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white shadow-sm resize-none"
                    placeholder="Ürün hakkında detaylı bilgi verin..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Fiyat (₺)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">₺</span>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white shadow-sm"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Kategori</label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white shadow-sm"
                    >
                      <option value="Erkek">👨 Erkek</option>
                      <option value="Kadın">👩 Kadın</option>
                      <option value="Çocuk">👶 Çocuk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Alt Kategori</label>
                    <select
                      onChange={(e) => setSubCategory(e.target.value)}
                      value={subCategory}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white shadow-sm"
                    >
                      <option value="Üst giyim">👕 Üst giyim</option>
                      <option value="Alt giyim">👖 Alt giyim</option>
                      <option value="Kış giyim">🧥 Kış giyim</option>
                    </select>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Bedenler</label>
                  <div className="flex flex-wrap gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSizes((prev) =>
                            prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                          )
                        }
                        className={`relative px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                          sizes.includes(size)
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                        }`}
                      >
                        {size}
                        {sizes.includes(size) && (
                          <Check className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full p-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                  {sizes.length === 0 && (
                    <p className="text-sm text-red-500 mt-2">En az bir beden seçmelisiniz</p>
                  )}
                </div>

                {/* Bestseller Toggle */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        onChange={() => setBestseller((prev) => !prev)}
                        checked={bestseller}
                        type="checkbox"
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${bestseller ? 'bg-amber-500' : 'bg-slate-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${bestseller ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-semibold text-slate-700">
                      ⭐ En iyi satanlara ekle
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Yükleniyor...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ürünü Ekle
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;