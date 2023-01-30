import Link from "next/link";

export default function ListAddress(props) {
  return (
    <div className="w-full border border-orange-500 p-2 rounded-md bg-orange-100">
      <div className="flex flex-col mt-2 space-y-2 h-full">
        {props?.status == "utama" ? (
          <p className="text-orange-500 font-bold text-sm text-right">Utama</p>
        ) : (
          <div className="h-5" />
        )}

        <div className="flex flex-col mt-2 space-y-2 justify-self-end">
          <h6 className="text-gray-700 font-bold text-sm capitalize">
            {props?.nama_depan} {props?.nama_belakang}
          </h6>
          <p className="text-gray-700 text-xs">{props?.telepon}</p>
          <p className="text-gray-700 text-xs">{props?.alamat}</p>
          <p className="text-gray-700 text-xs">{props?.kode_pos}</p>
          <Link href={`/address/edit/${props?.id}`}>
            <a className="text-center border border-orange-500 rounded-md py-1 text-sm font-bold text-white shadow-md bg-orange-500">
              Ubah Alamat
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
