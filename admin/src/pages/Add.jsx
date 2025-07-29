import { backendUrl } from '@/App';
import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  console.log('Gelen Token:', token);
  
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

  const handleImageChange = (index, file) => {
    if (file && validateImage(file)) {
      if (index === 0) {
        if (image1) URL.revokeObjectURL(URL.createObjectURL(image1));
        setImage1(file);
      } else if (index === 1) {
        if (image2) URL.revokeObjectURL(URL.createObjectURL(image2));
        setImage2(file);
      } else if (index === 2) {
        if (image3) URL.revokeObjectURL(URL.createObjectURL(image3));
        setImage3(file);
      } else if (index === 3) {
        if (image4) URL.revokeObjectURL(URL.createObjectURL(image4));
        setImage4(file);
      }
    }
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
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Fotoğraf Yükle</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((image, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img
                className='w-20'
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt={`Image ${i + 1}`}
              />
              <input
                onChange={(e) => handleImageChange(i, e.target.files[0])}
                type='file'
                id={`image${i + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Ürün ismi</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Ürün ismini girin'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Ürün tanımı</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Ürün tanımını girin'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Ürün kategorisi</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='w-full px-3 py-2'
          >
            <option value='Erkek'>Erkek</option>
            <option value='Kadın'>Kadın</option>
            <option value='Çocuk'>Çocuk</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Alt kategori</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className='w-full px-3 py-2'
          >
            <option value='Üst giyim'>Üst giyim</option>
            <option value='Alt giyim'>Alt giyim</option>
            <option value='Kış giyim'>Kış giyim</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Ürün fiyatı</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='25'
            min='0'
            required
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Ürün bedeni</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? 'bg-black text-white' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer rounded-lg`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type='checkbox'
          id='bestseller'
        />
        <label htmlFor='bestseller' className='cursor-pointer'>
          En iyi satanlara ekle
        </label>
      </div>

      <Button type='submit' className='w-28 mt-4' disabled={isLoading}>
        {isLoading ? 'Yükleniyor...' : 'Ekle'}
      </Button>
    </form>
  );
};

export default Add;