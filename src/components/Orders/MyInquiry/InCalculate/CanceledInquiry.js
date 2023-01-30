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
import {
  resubmissionInquiryCanceled,
  removeInquiry,
} from 'constants/api/member';
import { toast } from 'react-toastify';

export default function CanceledInquiry({ product, count, setCount }) {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

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
        }
      }
    });
  };

  const resubmission = async () => {
    setLoading(true);
    const response = await resubmissionInquiryCanceled(
      JSON.stringify({ id: product.id })
    );
    if (response.status === 200) {
      toast.success('Berhasil melakukan pengajuan ulang');
      setCount(count + 1);
    } else {
      toast.error(response.message);
      setCount(count + 1);
    }
    setLoading(false);
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
            <div className='px-2 flex items-center justify-between space-x-5'>
              <div>
                <p className='text-xs text-justify line-clamp-4 uppercase font-semibold'>
                  {product.produk}
                </p>
                <p className='text-xs font-bold text-left mt-2'>
                  Alasan Gagal :
                </p>
                <p className='text-xs text-red-500'>
                  {product.alasan.length === 0 ? '-' : product.alasan}
                </p>
                <div className='flex justify-between'>
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
                  <button
                    disabled={loading}
                    onClick={resubmission}
                    className={`${
                      loading ? 'bg-gray-500' : 'bg-orange-500'
                    } text-white text-xs px-3 py-1 mt-2 rounded-md`}
                  >
                    Ajukan Ulang
                  </button>
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
