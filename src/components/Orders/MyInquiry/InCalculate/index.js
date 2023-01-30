import Spinner from "components/Global/Spinner";
import { useState } from "react";
import OnProgressInquiry from "./OnProgressInquiry";
import CanceledInquiry from "./CanceledInquiry";

export default function InCalculate({
  data,
  isLoading,
  count,
  setCount,
  canceled,
}) {
  const [selectType, setSelectType] = useState("calculate");

  return (
    <div
      className={`w-full transition-all duration-300 ${
        !isLoading ? "min-h-40" : "h-32"
      }`}>
      <div className='flex items-center p-2'>
        <div className='w-2/12'>
          <p className='text-sm text-gray-700'>Filter</p>
        </div>
        <div className='w-10/12'>
          <select
            onChange={(e) => setSelectType(e.target.value)}
            className='p-1 text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 rounded-md transition-all duration-300'>
            <option value='calculate'>Sedang Dihitung</option>
            <option value='canceled'>Pengajuan Gagal</option>
          </select>
        </div>
      </div>
      {!isLoading ? (
        selectType === "calculate" ? (
          data?.length > 0 ? (
            data?.map((product, index) => {
              return (
                <OnProgressInquiry
                  product={product}
                  key={index}
                  setCount={setCount}
                  count={count}
                />
              );
            })
          ) : (
            <p className='bg-white text-center text-gray-700 mt-5'>
              Data tidak ditemukan
            </p>
          )
        ) : canceled.length > 0 ? (
          canceled.map((product) => {
            return (
              <CanceledInquiry
                key={product.id}
                product={product}
                setCount={setCount}
                count={count}
              />
            );
          })
        ) : (
          <p className='bg-white text-center text-gray-700 mt-5'>
            Data tidak ditemukan
          </p>
        )
      ) : (
        <div className='w-full text-center mt-10'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
