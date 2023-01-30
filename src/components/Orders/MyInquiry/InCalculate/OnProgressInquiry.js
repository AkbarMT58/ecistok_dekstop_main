import { useState } from 'react';
import ModalComment from '../ModalComment';
import {
  IconButton,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  DeleteOutlineIcon,
} from 'components/Global/Icons';
import Collapse from '@mui/material/Collapse';
import Image from 'next/image';
import { removeInquiry } from 'constants/api/member';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function OnProgressInquiry({ product, count, setCount }) {
  const [showList, setShowList] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    swal({
      title: 'Hapus inquiry ini ?',
      text: 'Data Inquiry yang dihapus tidak dapat kembali',
      buttons: true,
      dangerMode: true,
    }).then(async (submit) => {
      if (submit) {
        const response = await removeInquiry(product.id);
        if (response?.status === 200) {
          toast.success('Berhasil Menghapus Inquiry');
          setCount(count + 1);
          // router.push('/dashboard/orders?path=myorders');
        }
      }
    });
  };

  return (
    <div>
      <div className='border-t-2 flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white'>
        <div className='w-full flex justify-between'>
          <div className='w-3/12'>
            <div className='flex flex-col space-y-2 items-center justify-center'>
              <img
                src={
                  product?.gambar.length > 0
                    ? product?.gambar
                    : '/default-image.png'
                }
                className='rounded-md w-28 h-28'
              />
              <ModalComment idComment={product?.id} />
            </div>
          </div>
          <div className='flex flex-col w-9/12'>
            <div className='px-2 max-h-20 flex items-center justify-between space-x-5'>
              <div>
                <Link href={`/product/${product.toko}/${product.id_page}`}>
                  <p className='text-xs text-justify line-clamp-4 uppercase font-semibold cursor-pointer hover:text-orange-500'>
                    {product.produk}
                  </p>
                </Link>
                <div className='flex mt-1 items-center'>
                  <p className='text-xs text-orange-500 font-bold'>
                    Detail Varian
                  </p>
                  <IconButton onClick={() => setShowList(!showList)}>
                    {showList ? (
                      <KeyboardArrowUpIcon
                        fontSize='small'
                        className='text-orange-500'
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        fontSize='small'
                        className='text-orange-500'
                      />
                    )}
                  </IconButton>
                </div>
              </div>
              <IconButton onClick={() => handleRemove(product.id)}>
                <DeleteOutlineIcon fontSize='small' className='text-red-500' />
              </IconButton>
            </div>
            <Collapse in={showList} timeout='auto' unmountOnExit>
              <div className='px-4 pt-4 pb-2 flex flex-col space-y-2 text-sm text-gray-500 bg-white border-t border-gray-100'>
                <div className='flex'>
                  <div className='w-6/12'>
                    <p className='text-gray-700 text-xs font-bold text-center'>
                      Varian
                    </p>
                  </div>
                  <div className='w-3/12'>
                    <p className='text-gray-700 text-xs font-bold text-center'>
                      Harga
                    </p>
                  </div>
                  <div className='w-3/12'>
                    <p className='text-gray-700 text-xs font-bold text-center'>
                      Qty
                    </p>
                  </div>
                </div>

                {product?.variant.length > 0 ? (
                  product.variant.map((variant) => {
                    return (
                      <div className='flex' key={variant.id}>
                        <div className='w-6/12 flex items-center justify-center space-x-1'>
                          {variant?.gambar.length > 0 ? (
                            <Image
                              src={variant.gambar}
                              height={40}
                              width={40}
                              alt='jasa import barang dari china'
                            />
                          ) : (
                            <></>
                          )}
                          <p className='text-gray-700 text-xs text-center line-clamp-1'>
                            {variant?.variant}
                          </p>
                        </div>
                        <div className='w-3/12'>
                          <p className='text-gray-700 text-xs text-center'>
                            Rp.{' '}
                            {(variant.harga_req * 2350).toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className='w-3/12'>
                          <p className='text-gray-700 text-xs text-center'>
                            {variant.kuantiti}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}
