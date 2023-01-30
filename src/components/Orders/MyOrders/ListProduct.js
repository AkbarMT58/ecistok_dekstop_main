import { useState, Fragment } from 'react';
import Collapse from '@mui/material/Collapse';
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from 'components/Global/Icons';
import Link from 'next/link';

const ListProduct = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Collapse in={checked} collapsedSize={120}>
        {item.Produk.map((product, i) => {
          return (
            <div key={i}>
              <div className='flex p-2 space-x-2 items-center'>
                <div className='w-2/12'>
                  <div>
                    {product.gambar.trim().length > 0 ? (
                      <img
                        src={product.gambar}
                        className='w-24 rounded-md shadow-md'
                        alt=''
                      />
                    ) : (
                      <img
                        src={product.idvariant == '111' ? '/cargo-gray.svg' : product.idvariant == '222' ? '/biaya-layanan.svg' : product.idvariant == '333' ? '/voucher.svg' : '/default-image.png'}
                        className='w-24 rounded-md shadow-md'
                        alt=''
                      />
                    )}
                  </div>
                </div>

                <div className='w-10/12'>
                  <div className='flex flex-col'>
                    {product?.request_id !== 0 ? (
                      <Link
                        href={`/product/${product?.toko}/${product?.id_page}`}
                      >
                        <a
                          className='text-sm text-gray-800 line-clamp-2 font-semibold uppercase cursor-pointer hover:text-orange-500'
                          title={product.produk}
                        >
                          {product.produk}
                        </a>
                      </Link>
                    ) : (
                      <p
                        className='text-sm text-gray-800 line-clamp-2 font-semibold uppercase'
                        title={product.produk}
                      >
                        {product.produk}
                      </p>
                    )}

                    <div className='mt-1 flex flex-col space-y-1 text-xs text-gray-700'>
                      <p className='line-clamp-1'>
                        Variant : {product.variant}
                      </p>
                      <p>{product.kuantiti} Barang</p>
                      <p className='font-semibold'>
                        Rp {product.harga.toLocaleString('ID-id')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Collapse>
      {item.Produk.length > 1 && (
        <div className='mt-2'>
          <hr />
          <div
            onClick={handleChange}
            className='flex items-center  justify-center text-center text-xs mt-2 text-orange-500 cursor-pointer'
          >
            <p>Tampilkan lebih {checked ? 'sedikit' : 'banyak'}</p>
            {checked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
