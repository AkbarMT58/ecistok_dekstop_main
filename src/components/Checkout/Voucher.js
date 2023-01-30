import { CheckIcon } from 'components/Global/Icons';

const Voucher = ({
  handleSubmitVoucher,
  handleRemoveVoucher,
  payload,
  voucher,
  setVoucher,
}) => {
  return (
    <div className='bg-white w-full rounded-t-md'>
      <div className='p-3 text-gray-700'>
        {payload.kode_diskon.trim().length === 0 ? (
          <form
            className='flex items-center justify-between space-x-2'
            onSubmit={handleSubmitVoucher}
          >
            <input
              placeholder='Masukan Kode Voucher'
              type='text'
              value={voucher.code}
              onChange={(e) => setVoucher({ ...voucher, code: e.target.value })}
              className='w-7/12 border-b border-gray-200 py-1 px-3 focus:outline-none'
            />
            <button
              type='submit'
              className='bg-orange-500 text-white py-1 px-3 rounded-md'
            >
              Pakai Voucher
            </button>
          </form>
        ) : (
          <div className='flex justify-between items-center'>
            <div>
              <div className='flex items-center'>
                <CheckIcon fontSize='small' className='text-orange-500' />
                <p className='text-xs text-gray-500'>Berhasil Digunakan</p>
              </div>
              <p className='text-md text-gray-500 font-semibold'>
                {payload.kode_diskon}
              </p>
            </div>
            <button
              type='button'
              onClick={handleRemoveVoucher}
              className='bg-white border border-marron-500 text-marron-500 py-1 px-3 rounded-md'
            >
              Hapus Voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voucher;
