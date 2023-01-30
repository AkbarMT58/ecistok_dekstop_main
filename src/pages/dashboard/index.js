import Orders from 'components/Orders';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import DashboardTemplate from 'components/Layout/DashboardTemplate';

export default function orders({ path }) {
  return (
    <>
      <Heads />
      <DashboardTemplate>
        <Orders path={path} />
      </DashboardTemplate>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  // const template = await getTemplate('/dashboard/orders');
  const { token } = req.cookies;
  const path = query?.path ?? 0;
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
      // template,
      path,
    },
  };
}
