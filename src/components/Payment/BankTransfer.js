import { DescriptionIcon } from "components/Global/Icons";
import { toast } from "react-toastify";

const BankTransfer = ({ data }) => {
  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    navigator.clipboard.writeText(textField.value);
    textField.remove();
    toast.success("copy to clipboard", {
      position: "top-center",
    });
  };

  return (
    <div className='bg-white mt-2 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between text-gray-700'>
          <p className='font-semibold'>Transfer Bank</p>
          <img src={data?.gambar} className='h-5 w-10 object-contain' />
        </div>
        <hr className='my-3' />
        <p className='text-gray-700'>Nomor Rekening</p>
        <div className='flex justify-between items-center text-gray-700'>
          <p className='font-semibold'>{data?.nomor_rekening}</p>
          <div
            onClick={() => copyToClipboard(data?.nomor_rekening)}
            className='text-sm flex space-x-2 items-center text-orange-500'>
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <p className='text-gray-700 mt-3'>Total Pembayaran</p>
        <div className='flex justify-between items-center text-gray-700'>
          <p className='font-semibold'>
            Rp {data?.total_price?.toLocaleString("ID-id") ?? 0}
          </p>
          <div
            onClick={() => copyToClipboard(data?.total_price)}
            className='text-sm flex space-x-2 items-center text-orange-500'>
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <div className='w-full text-sm flex justify-between mt-10 items-center'>
          <a className='py-2 cursor-pointer px-5 bg-orange-500 text-white rounded-lg border-orange-500'>
            Lanjut Berbelanja
          </a>
          <a className='py-2 cursor-pointer px-5 text-orange-500 border transition-all duration-300 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white'>
            Cek Status Pembayaran
          </a>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
