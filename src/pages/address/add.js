import FormAdd from 'components/Address/FormAdd';
import DashboardTemplate from 'components/Layout/DashboardTemplate';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';

export default function add({ template }) {
  return (
    <>
      <Heads {...template} />
      <DashboardTemplate>
        <FormAdd isAddress={true} />
      </DashboardTemplate>
    </>
  );
}

export async function getServerSideProps({ req }) {
  // const template = await getTemplate("/address/add");
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
    }, // will be passed to the page component as props
  };
}
