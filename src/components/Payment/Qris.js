import { DescriptionIcon } from "components/Global/Icons";
import { paymentQris } from "constants/api/member";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import copyText from "helpers/copyText";
import midtransResponse from "helpers/midtransResponse";
import { Random } from "random-js";
import { useState } from "react";
import Link from "next/link";

const Qris = ({ data, timer }) => {
  const router = useRouter();

  return (
    <div className='bg-white mt-2 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between text-gray-700'>
          <p className='font-semibold capitalize'>{data?.PaymentType}</p>
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
        <div className='w-full'>
          <p className='text-center font-semibold'>Scan QRIS</p>
          <img src={data?.body?.actions[0].url} />
        </div>

        <div className='w-full flex justify-center flex-col space-y-3 mt-10 items-center'>
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
          <a
            href={`https://api.whatsapp.com/send?text=Hai%20ocistok%2C%0A%0Asaya%20ingin%20bertanya%20terkait%20pembayaran%20dengan%20nomor%20order%20${data?.response?.order_id}&phone=6281210001808`}
            target='_blank'
            rel='noreferrer'
            className='py-1 w-8/12 text-center text-green-500 border border-green-500 rounded-lg'>
            Hubungi Customer Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Qris;
