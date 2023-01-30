import Link from 'next/link';
import ListAddress from 'components/ListAddress';
import { useEffect, useState, useCallback } from 'react';
import { getAddress } from 'constants/api/member';
import DashboardTemplate from 'components/Layout/DashboardTemplate';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import Spinner from 'components/Global/Spinner';

export default function address({ template }) {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAddressCustomer = useCallback(async () => {
    setLoading(true);
    const response = await getAddress();
    if (response.status === 200) {
      setAddress(response.alamat);
    }
    setLoading(false);
  }, [address]);

  useEffect(() => {
    getAddressCustomer();
  }, []);

  return (
    <>
      <Heads {...template} />
      <DashboardTemplate>
        <div className='flex flex-col'>
          <div className='flex space-x-2 bg-white border-b border-gray-200 py-2'>
            <div className='w-full flex justify-between text-sm items-center'>
              <h1 className='text-gray-700 font-bold'>Ubah Alamat</h1>
              <Link href='/address/add'>
                <a className='text-orange-500 font-bold'>Tambah Alamat</a>
              </Link>
            </div>
          </div>
          {!loading ? (
            <div className='grid grid-cols-2 py-5 gap-8 bg-white'>
              {address.length > 0 ? (
                address.map((e) => {
                  return <ListAddress key={e?.id} {...e} />;
                })
              ) : (
                <p className='text-center text-gray-700 mt-5'>
                  Data tidak di temukan &#128577;
                </p>
              )}
            </div>
          ) : (
            <div className='mt-10 flex flex-col items-center'>
              <Spinner />
              <p className='text-sm text-gray-500'>Memuat data alamat ...</p>
            </div>
          )}
        </div>
      </DashboardTemplate>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  // const template = await getTemplate("/address");
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      // template
    },
  };
}
