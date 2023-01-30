import Link from "next/link";

export default function CardAddress(props) {
  return (
    <div className='w-full border border-orange-500 p-2 rounded-md bg-orange-100'>
      <div className='flex flex-col mt-2 space-y-2'>
        {props?.kode_pos === 0 ? (
          <div className='w-6/12 text-center text-white bg-marron-500 p-1 rounded-full'>
            <p className='text-xs font-bold'>Alamat belum lengkap</p>
          </div>
        ) : (
          <></>
        )}
        {props?.status == "utama" ? (
          <p className='text-orange-500 font-bold text-sm text-right'>Utama</p>
        ) : (
          <></>
        )}
        <h6 className='text-gray-700 font-bold text-sm'>
          {props?.nama_depan} {props?.nama_belakang}
        </h6>
        <p className='text-gray-700 text-xs'>{props?.telepon}</p>
        <p className='text-gray-700 text-xs'>{props?.alamat}</p>
        {props?.kode_pos !== 0 ? (
          <p className='text-gray-700 text-xs'>{props?.kode_pos}</p>
        ) : (
          <></>
        )}

        {props?.kode_pos === 0 ? (
          <Link href={`/address/edit/${props?.id}`}>
            <a className='text-center border border-orange-500 rounded-md py-1 text-xs font-bold text-white shadow-md bg-orange-500'>
              Lengkapi Alamat
            </a>
          </Link>
        ) : (
          <Link href={`/address/edit/${props?.id}`}>
            <a className='text-center border border-orange-500 rounded-md py-1 text-xs font-bold text-white shadow-md bg-orange-500'>
              Ubah Alamat
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
