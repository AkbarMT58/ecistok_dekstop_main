import Link from 'next/link';
import LoadableImage from 'components/Global/LoadableImage';
import { useState, useEffect } from 'react';
import users from 'helpers/users';
import { FavoriteBorderIcon, FavoriteIcon } from 'components/Global/Icons';
import { addWishlist, removeWishlist } from 'constants/api/member';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setWishlist } from 'redux/reducers/populerSlice';
import { setTemporaryProductList, setTemporaryAnotherProductList, setLastPage, setLastKeyword, setLastProductIdClicked } from 'redux/reducers/temporaryProductListSlice';
import router from 'next/router';

export default function CardProduct({
  id,
  image,
  index,
  title,
  url,
  price,
  type,
  wishlist,
  isPopuler = false,
  indexCategory,
  listProduct,
  pages,
  keyword,
  anotherListProduct,
  isAnotherList
}) {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [isFavorite, setIsFavorite] = useState(wishlist);
  
  useEffect(() => {
    const user = users();
    setIsLogin(user.isLogin ? true : false);
  }, []);

  const handleFavorite = async () => {
    if (isFavorite) {
      const req = await removeWishlist(id, type);
      if (req?.status === 200) {
        toast.success('Berhasil Menghapus Produk Dari Daftar Keinginan');
        setIsFavorite(false);
        if (isPopuler) {
          dispatch(setWishlist({ indexCategory, index, type }));
        }
      }
    } else {
      const payload = {
        judul: title,
        gambar: image,
        link: id,
        toko: type,
      };
      const req = await addWishlist(JSON.stringify(payload));
      if (req?.status == 200) {
        toast.success('Berhasil menambahkan Daftar Keinginan');
        setIsFavorite(true);
        if (isPopuler) {
          dispatch(setWishlist({ indexCategory, index, type }));
        }
      }
    }
  };

  const saveCurrentState = () => {
    localStorage.setItem('productId', 'produk-' + id)
    dispatch(setTemporaryProductList(listProduct))
    dispatch(setLastPage(pages))
    dispatch(setLastKeyword(keyword))
    dispatch(setLastProductIdClicked(id))
    dispatch(setTemporaryAnotherProductList(anotherListProduct))
  }
  return (
    <div id={'produk-' + id} className='w-full rounded-md bg-white p-4 shadow-lg hover:scale-105 transition-all duration-500'>
      <Link href={url}>
        <a onClick={saveCurrentState}>
          <div className='relative'>
            <LoadableImage
              className='rounded-sm overflow-hidden relative'
              src={image}
              height={250}
              width={300}
              alt={title}
              layout='fill'
              objectFit='cover'
              loading='eager'
              priority={true}
            />
            <div className='absolute top-0 right-0 text-white bg-orange-500 px-2 py-2 capitalize rounded-bl-[15px]'>
              {type}
            </div>
          </div>
        </a>
      </Link>
      <h2 className='mt-2 text-sm text-gray-700 line-clamp-1'>{title}</h2>
      <div className='flex justify-between mt-2'>
        <h2 className='text-md text-orange-500'>
          Rp.{price.toLocaleString('id-ID')}
        </h2>
        {isLogin ? (
          isFavorite ? (
            <button onClick={handleFavorite}>
              <FavoriteIcon fontSize='small' className='text-red-400' />
            </button>
          ) : (
            <button onClick={handleFavorite}>
              <FavoriteBorderIcon fontSize='small' className='text-red-400' />
            </button>
          )
        ) : (
          <Link href='/login'>
            <FavoriteBorderIcon
              fontSize='small'
              className='cursor-pointer text-red-400'
            />
          </Link>
        )}
      </div>
    </div>
  );
}
