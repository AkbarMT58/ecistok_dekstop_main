import DashboardTemplate from 'components/Layout/DashboardTemplate';
import { getTemplate } from 'constants/api/template';
import Profile from 'components/MyProfile';
import Heads from 'components/Heads';

const myprofile = ({ template }) => {
  return (
    <>
      <Heads title={'My Profile'} />
      <DashboardTemplate>
        <Profile />
      </DashboardTemplate>
    </>
  );
};

export default myprofile;

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
