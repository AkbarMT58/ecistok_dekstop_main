import { useState } from 'react';
import { KeyboardArrowUpIcon } from 'components/Global/Icons';
import { KeyboardArrowDownIcon } from 'components/Global/Icons';
import { Collapse } from '@mui/material';
import { IconButton } from '@mui/material';
import Spinner from 'components/Global/Spinner';

const TotalBayar = ({
  data,
  voucher,
  payload,
  handleSubmitCheckout,
  address,
  loadingSubmit,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='bg-white w-full rounded-b-lg'>
        <div className='px-10 pt-5 pb-8 text-gray-700 text-sm flex items-center space-x-5  justify-end w-full'>
          <div className=''>
            <p className='font-semibold'>Total Bayar</p>
            <div className='flex items-center space-x-2'>
              <p className='text-lg text-red-500 font-semibold'>
                Rp.{' '}
                {isNaN(data?.total_price - voucher.value)
                  ? 0
                  : (
                      data?.total_price -
                      voucher.value +
                      payload.ongkir +
                      data?.biaya_layanan
                    ).toLocaleString('ID-id')}
              </p>

              <IconButton onClick={() => setOpen(!open)}>
                {open ? (
                  <KeyboardArrowUpIcon
                    fontSize='small'
                    // onClick={() => setOpen(!open)}
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    fontSize='small'
                    // onClick={() => setOpen(!open)}
                  />
                )}
              </IconButton>
            </div>
          </div>
          {loadingSubmit ? (
            <Spinner diameter={8} />
          ) : (
            <button
              onClick={handleSubmitCheckout}
              className='bg-orange-500 text-white py-2 px-8 rounded-md'
            >
              Bayar
            </button>
          )}
        </div>
      </div>
      <div className='bg-white rounded-b-md pb-10'>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <div className='border-b border-gray-300 '>
            <div className='container mx-auto pb-3'>
              <p className='font-semibold text-xl'>Detail Pembayaran</p>
            </div>
          </div>
          <div className='border-b border-gray-300'>
            <div className='container mx-auto py-3'>
              <div className='flex justify-between items-center text-md text-gray-700'>
                <p>Total Harga</p>
                <p>Rp {data?.total_price?.toLocaleString('ID-id')}</p>
              </div>
              <div className='flex justify-between mt-1'>
                <p>Biaya Layanan</p>
                <p>Rp {(data?.biaya_layanan).toLocaleString('ID-id')}</p>
              </div>
              <div className='flex justify-between items-center text-md text-gray-700'>
                <p>Total Ongkos Kirim</p>
                <p>Rp {payload?.ongkir.toLocaleString('ID-id')}</p>
              </div>
              <div className='flex justify-between items-center text-md text-gray-700'>
                <p>Total Diskon</p>
                <p>- Rp {voucher.value.toLocaleString('ID-id')}</p>
              </div>
            </div>
          </div>
          <div className='py-3 container mx-auto flex justify-between items-center'>
            <p className='text-md text-gray-700'>Total Bayar</p>
            <p className='text-lg text-marron-500 font-semibold'>
              Rp{' '}
              {(
                data?.total_price -
                voucher.value +
                payload.ongkir +
                data?.biaya_layanan
              ).toLocaleString('ID-id')}
            </p>
          </div>
          <div className='container mx-auto py-4'>
            <p className='text-marron-500 font-semibold mb-2'>List Produk</p>
            {data?.Produk?.map((item) => {
              return item.Variant.map((variant, i) => {
                return (
                  <div
                    key={i}
                    className='mb-2 flex justify-between items-center'
                  >
                    <div className='w-8/12'>
                      <p className='line-clamp-1 text-md text-gray-700'>
                        {item.produk}
                      </p>
                      <p className='text-xs'>Variant : {variant.variant}</p>
                      <p className='text-xs'>
                        {variant.kuantiti} x Rp{' '}
                        {variant.harga.toLocaleString('ID-id')}
                      </p>
                    </div>
                    <div className='w-4/12 text-right'>
                      <p className='text-lg text-gray-700 font-semibold'>
                        Rp{' '}
                        {(variant.harga * variant.kuantiti).toLocaleString(
                          'ID-id'
                        )}
                      </p>
                    </div>
                  </div>
                );
              });
            })}
          </div>
          <div className='container mx-auto text-gray-700'>
            <p className='font-semibold text-marron-500'>Logistik Pengiriman</p>
            <p>
              {payload?.kurir} - {payload?.service}
            </p>
            <p className='mt-2 font-semibold text-marron-500'>
              Alamat Pengiriman
            </p>
            <p className='line-clamp-1 capitalize'>
              {address?.nama_depan} {address?.nama_belakang}
            </p>
            <p>{address?.telepon}</p>
            <p>{address?.alamat}</p>
            <p>
              {address?.kecamatan} - {address?.kabupaten}
            </p>
          </div>
        </Collapse>
      </div>
    </>
  );
};
export default TotalBayar;
