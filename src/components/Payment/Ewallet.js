import { DescriptionIcon } from "components/Global/Icons";
import { paymentGopay, paymentShopeepay } from "constants/api/member";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import QRModal from "./QRModal";
import { useState } from "react";
import { Random } from "random-js";
import midtransResponse from "helpers/midtransResponse";

const Ewallet = ({ data, timer }) => {
  const random = new Random();
  const value = random.integer(1, 10000000);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [url, setUrl] = useState("");
  const handleSubmit = async () => {
    const random = new Random();
    const value = random.integer(10000, 1000000);
    let response;
    const payload = {
      payment_type: data?.Payment_type,
      token_id: "123455",
      id_so: data.id_so,
      random: value,
    };

    if (data?.Payment_type === "gopay") {
      response = await paymentGopay(JSON.stringify(payload));
    } else {
      response = await paymentShopeepay(JSON.stringify(payload));
    }

    let arr = {};
    if (response?.status === 201) {
      if (data?.Payment_type === "gopay") {
        arr = response.body.actions.find((e) => e.name === "generate-qr-code");
      } else {
        arr = response.body.actions.find((e) => e.name === "deeplink-redirect");
      }
      // router.push(arr.url);
      setUrl(arr.url);
      setOpen(true);
    } else {
      toast.error(midtransResponse(response?.status), {
        position: "top-center",
      });
    }
  };

  return (
    <div className='bg-white mt-2 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between text-gray-700'>
          <p className='font-semibold capitalize'>
            {data?.Payment_type && data?.Payment_type}
          </p>
          <img src={data?.gambar} className='h-5 w-10 object-contain' />
        </div>
        <hr className='my-3' />
        <p className='text-sm text-gray-700 mt-3'>Total Pembayaran</p>
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
        <hr className='my-3' />
        <div className='w-full h-10 flex justify-center flex-col space-y-3 mt-10 items-center'>
          {timer > 0 && (
            <button
              onClick={handleSubmit}
              className='py-1 px-12 bg-orange-500 text-white rounded-lg'>
              Bayar Sekarang
            </button>
          )}
        </div>
        <QRModal open={open} setOpen={setOpen} url={url} id={data.id_so} />
      </div>
    </div>
  );
};

export default Ewallet;
