import { useCallback, useEffect, useState } from "react";
import { getRefund } from "constants/api/member";
import ListRefund from "./ListRefund";
import Spinner from "components/Global/Spinner";

const Refund = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getRefundData = useCallback(async () => {
    setLoading(true);
    const response = await getRefund();
    if (response.status === 200) {
      setData(response.data);
    } else {
      setData([]);
    }
    setLoading(false);
  }, [data]);

  useEffect(() => {
    getRefundData();
  }, []);

  return (
    <div className='bg-gray-200 flex flex-col space-y-2'>
      <div className='bg-white py-3'>
        <div>
          <div className='flex items-center space-x-2'>
            <p className='font-semibold text-gray-700 text-md'>Filter</p>
            <select className='p-1 text-sm bg-white border rounded-md border-gray-300 outline-none focus:border-orange-500 focus:ring ring-orange-300 transition-all duration-300 capitalize'>
              <option value='all'>Semua Pesanan</option>
              <option value='open'>Pending</option>
              <option value='closed'>Open</option>
              <option value='canceled'>Completed</option>
              <option value='canceled'>Rejected</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='bg-white pt-5'>
          <Spinner />
        </div>
      ) : data.length === 0 ? (
        <p className='pt-5 text-center bg-white'>Data tidak ditemukan</p>
      ) : (
        data.map((item) => {
          return <ListRefund key={item.id} item={item} />;
        })
      )}
    </div>
  );
};

export default Refund;
