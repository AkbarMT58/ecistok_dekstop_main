import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const NotificationResponse = ({ data }) => {
  return (
    <div className='mt-5 flex w-full flex-col justify-center items-center space-y-3 '>
      {data?.status === 'success' ? (
        <CheckCircleIcon sx={{ fontSize: '50px' }} className='text-green-500' />
      ) : data?.status === 'pending' ? (
        <WarningIcon sx={{ fontSize: '50px' }} className='text-yellow-500' />
      ) : (
        <ErrorIcon sx={{ fontSize: '50px' }} className='text-red-500' />
      )}
      <p className='text-center font-semibold text-xl'>
        {/* {data?.response?.status_message
          ? data?.response?.status_message
          : data?.response?.message} */}
        {data?.status === 'success'
          ? 'Pembayaran Sedang Di Proses'
          : data?.response?.status_message}
      </p>
      <Link href='/'>
        <a className='p-2 w-full text-center bg-orange-500 text-white rounded-lg border hover:text-black'>
          Lanjut Berbelanja
        </a>
      </Link>
      <Link href='/dashboard/orders?path=myorders'>
        <a className='p-2 w-full text-center text-orange-500 border border-orange-500 rounded-lg hover:text-black'>
          Cek Status Pembayaran
        </a>
      </Link>
      <a
        href={`https://api.whatsapp.com/send?text=Hai%20ocistok%2C%0A%0Asaya%20ingin%20bertanya%20terkait%20pembayaran%20dengan%20nomor%20order%20${data?.response?.order_id}&phone=6281210001808`}
        target='_blank'
        rel='noreferrer'
        className='p-2 w-full text-center text-green-500 border border-green-500 rounded-lg hover:text-black'
      >
        Hubungi Customer Service
      </a>
    </div>
  );
};

export default NotificationResponse;
