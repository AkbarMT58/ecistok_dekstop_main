import { waComplain } from "helpers/linkWa";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <img src='/500.svg' />
      <p className='font-semibold'>Internal Server Error</p>
      <Link href='/'>
        <a className='mt-5 px-4 py-1 bg-orange-500 text-white rounded-md'>
          Kembali Ke Beranda
        </a>
      </Link>
      <Link href={waComplain}>
        <a className='mt-5 px-4 py-1 bg-orange-500 text-white rounded-md'>
          Hubungi Ocistok
        </a>
      </Link>
    </div>
  );
}
