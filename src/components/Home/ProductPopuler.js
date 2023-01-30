import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardProduct from 'components/Global/CardProduct';
import Spinner from 'components/Global/Spinner';
import { homeProduct } from 'constants/api/product';
import { setPopuler1688 } from 'redux/reducers/populerSlice';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductPopuler() {
  const selector = useSelector((state) => state.populer);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getProduct1688 = useCallback(async () => {
    setLoading(true);
    const response = await homeProduct();
    if (response?.status === 200) {
      dispatch(setPopuler1688(response?.data));
    }
    setLoading(false);
  }, [selector]);

  useEffect(() => {
    if (selector['1688'].length === 0) {
      getProduct1688();
    }
  }, []);

  return (
    <section className='w-full px-4 mt-4 sm:px-0'>
      <div className='focus:outline-none'>
        {loading ? (
          <div className='w-full pt-2 bg-white text-center'>
            <Spinner label='load data' />
          </div>
        ) : (
          selector['1688'].map((category, index) => {
            return (
              <div key={index} className='mt-5 bg-white rounded-xl p-5 w-full'>
                <div className='my-2 flex justify-between'>
                  <p className='text-xl font-bold text-gray-700'>
                    {category?.kategori}
                  </p>
                  <Link
                    href={`/search?keyword=${category?.kategori?.replace(
                      ' ',
                      '+'
                    )}&type=1688`}
                  >
                    <a className='text-orange-500'>Lihat Semua</a>
                  </Link>
                </div>
                <div className='grid grid-cols-4 gap-6'>
                  {category?.produk?.map((post, i) => (
                    <CardProduct
                      key={i}
                      id={post?.id_produk}
                      index={i}
                      image={post?.gambar}
                      title={post?.produk}
                      price={post?.harga}
                      type={post?.type}
                      isPopuler={true}
                      wishlist={post?.wishlist}
                      url={`/product/1688/${post?.id_produk}`}
                      indexCategory={index}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
