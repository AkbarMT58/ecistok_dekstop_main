import { useRouter } from 'next/router';
import FormEdit from 'components/Address/FormEdit';
import DashboardTemplate from 'components/Layout/DashboardTemplate';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';

export default function index({ template }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Heads {...template} />
      <DashboardTemplate>
        <div className='w-full'>
          <div className='flex space-x-2 bg-white border-b border-gray-200 py-2'>
            <div className='w-full flex justify-between text-sm items-center'>
              <h1 className='text-gray-700 font-bold'>Ubah Alamat</h1>
            </div>
          </div>
          <FormEdit id={id} isAddress={true} />
        </div>
      </DashboardTemplate>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // const template = await getTemplate('/address');
  const { token } = req.cookies;
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
