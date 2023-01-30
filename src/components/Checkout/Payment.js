import PaymentMethod from './PaymentMethod';

const Payment = ({ data, payload, handleSelectPayment, voucher }) => {
  return (
    <div className='bg-white w-full rounded-b-md '>
      <div className='p-3 text-gray-700 text-sm'>
        <p className='font-semibold'>Ringkasan Belanja</p>
        <div className='flex justify-between mt-1'>
          <p>Total Harga ({data?.total_quantity} Barang)</p>
          <p>Rp {data?.total_price?.toLocaleString('ID-id')}</p>
        </div>
        <div className='flex justify-between mt-1'>
          <p>Biaya Layanan</p>
          <p>Rp {(data?.biaya_layanan).toLocaleString('ID-id')}</p>
        </div>
        <div className='flex justify-between mt-1'>
          <p>Total Ongkos Kirim</p>
          <p>Rp. {payload.ongkir.toLocaleString('ID-id')}</p>
        </div>
        <div className='flex justify-between mt-1'>
          <p>Total Diskon</p>
          <p>Rp {voucher.value.toLocaleString('ID-id')}</p>
        </div>
        <PaymentMethod
          data={data?.Pembayaran}
          handleSelectPayment={handleSelectPayment}
          payload={payload}
        />
      </div>
    </div>
  );
};
export default Payment;
