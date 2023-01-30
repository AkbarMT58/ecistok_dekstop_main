import { DescriptionIcon } from "components/Global/Icons";
import copyText from "helpers/copyText";
import Link from "next/link";

const Alfamart = ({ data }) => {
  return (
    <div className='bg-white mt-2 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between text-gray-700'>
          <p className='font-semibold capitalize'>{data?.Payment_type}</p>
          <img src={data?.gambar} className='h-5 w-10 object-contain' />
        </div>
        <hr className='my-3' />
        <p className='text-sm text-gray-700 mt-3'>Total Pembayaran</p>
        <div className='flex justify-between items-center text-gray-700'>
          <p className='font-semibold'>
            Rp {parseInt(data?.body?.gross_amount).toLocaleString("ID-id") ?? 0}
          </p>
          <div
            onClick={() => copyText(data?.body?.gross_amount)}
            className='text-sm flex space-x-2 items-center text-orange-500'>
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <hr className='my-3' />
        <div>
          <p className='text-sm text-gray-700 mt-3'>Kode Pembayaran</p>
          <div className='flex justify-between items-center text-gray-700'>
            <p className='font-semibold text-green-600'>
              {data?.body?.payment_code}
            </p>
            <div
              onClick={() => copyText(data?.body?.payment_code)}
              className='text-sm flex space-x-2 items-center text-orange-500'>
              <span>Salin</span>
              <DescriptionIcon />
            </div>
          </div>
          <hr className='my-3' />
        </div>

        <div className='w-full flex flex-col mt-3 space-y-3 justify-center items-center'>
          <Link href='/'>
            <a className='py-1 w-8/12 text-center bg-orange-500 text-white rounded-lg'>
              Lanjut Berbelanja
            </a>
          </Link>
          <Link href='/dashboard/orders?path=myorders'>
            <a className='py-1 w-8/12 text-center text-orange-500 border border-orange-500 rounded-lg'>
              Cek Status Pembayaran
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Alfamart;
