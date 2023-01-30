import { DescriptionIcon } from "components/Global/Icons";
import { toast } from "react-toastify";
import copyText from "helpers/copyText";
import { useState } from "react";
import { Random } from "random-js";
import Link from "next/link";
import midtransResponse from "helpers/midtransResponse";
import { paymentVA } from "constants/api/member";

const VirtualAccount = ({ data, timer }) => {
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const random = new Random();
    const value = random.integer(10000, 1000000);
    const payload = {
      payment_type: data?.Payment_type,
      token_id: "fsafw51215",
      id_so: data.id_so,
      random: value,
    };

    const response = await paymentVA(JSON.stringify(payload));
    if (response?.status === 201) {
      setCode(response.body.va_numbers[0].va_number);
    } else {
      toast.error(midtransResponse(response?.status), {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className="bg-white mt-2 py-3">
      <div className="container mx-auto">
        <div className="flex justify-between text-gray-700">
          <p className="font-semibold uppercase">{data?.Payment_type}</p>
          <img src={data?.gambar} className="h-5 w-10 object-contain" />
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-700 mt-3">Total Pembayaran</p>
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold">
            Rp {data?.total_price?.toLocaleString("ID-id") ?? 0}
          </p>
          <div
            onClick={() => copyText(data?.total_price)}
            className="text-sm flex space-x-2 items-center text-orange-500"
          >
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <hr className="my-3" />
        {code.trim().length > 0 && (
          <div>
            <p className="text-sm text-gray-700 mt-3">Virtual Account</p>
            <div className="flex justify-between items-center text-gray-700">
              <p className="font-semibold text-green-600">{code}</p>
              <div
                onClick={() => copyText(code)}
                className="text-sm flex space-x-2 items-center text-orange-500"
              >
                <span>Salin</span>
                <DescriptionIcon />
              </div>
            </div>
            <hr className="my-3" />
          </div>
        )}

        {timer > 0 && code.trim().length === 0 && (
          <div className="w-full h-10 flex justify-center flex-col space-y-3 mt-10 items-center">
            <button
              onClick={handleSubmit}
              className="py-1 px-12 bg-orange-500 text-white rounded-lg"
            >
              Bayar Sekarang
            </button>
          </div>
        )}

        {code.trim().length > 0 && (
          <div className="w-full flex flex-col mt-3 space-y-3 justify-center items-center">
            <Link href="/">
              <a className="py-1 w-8/12 text-center bg-orange-500 text-white rounded-lg">
                Lanjut Berbelanja
              </a>
            </Link>
            <Link href="/dashboard/orders?path=myorders">
              <a className="py-1 w-8/12 text-center text-orange-500 border border-orange-500 rounded-lg">
                Cek Status Pembayaran
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualAccount;
