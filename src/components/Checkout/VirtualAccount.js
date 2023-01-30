import { DescriptionIcon } from "components/Global/Icons";
import { toast } from "react-toastify";
import copyText from "helpers/copyText";
import { useState } from "react";
import { Random } from "random-js";
import Link from "next/link";
import midtransResponse from "helpers/midtransResponse";
import { paymentVA } from "constants/api/member";

const VirtualAccount = ({ data, timer }) => {
  return (
    <div className="bg-white mt-2 py-3">
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold uppercase ">{data?.PaymentType}</p>
          <img src={data?.gambar} className="h-10 w-20 object-contain" />
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-700 mt-3">Total Pembayaran</p>
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold">
            Rp{" "}
            {parseFloat(data?.body?.gross_amount).toLocaleString("ID-id") ?? 0}
          </p>
          <div
            onClick={() => copyText(data?.body?.gross_amount)}
            className="text-sm flex space-x-2 items-center text-orange-500"
          >
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <hr className="my-3" />
        <div>
          <p className="text-sm text-gray-700 mt-3">Virtual Account</p>
          <div className="flex justify-between items-center text-gray-700">
            <p className="font-semibold text-green-600">
              {data.body?.va_numbers[0].va_number}
            </p>
            <div
              onClick={() => copyText(data.body?.va_numbers[0].va_number)}
              className="text-sm flex space-x-2 items-center text-orange-500"
            >
              <span>Salin</span>
              <DescriptionIcon />
            </div>
          </div>
          <hr className="my-3" />
        </div>
        <div className="w-full flex  mt-3 justify-between items-center space-x-8">
          <Link href="/">
            <a className="py-1 w-6/12 text-center bg-orange-500 text-white rounded-lg">
              Lanjut Berbelanja
            </a>
          </Link>
          <Link href="/dashboard/orders?path=myorders">
            <a className="py-1 w-6/12 text-center text-orange-500 border border-orange-500 rounded-lg">
              Cek Status Pembayaran
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VirtualAccount;
