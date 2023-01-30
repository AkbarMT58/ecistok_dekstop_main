import Heads from 'components/Heads';
import Navbar from 'components/Home/Navbar';
import Header from 'components/Layout/Header';
import Headnav from 'components/Home/Headnav';
import Footer from 'components/Layout/Footer';
import { getListDetailsCatalog } from 'constants/api/member';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import DynamicCatalog from 'components/Catalog/DynamicCatalog';

const catalog = ({ data }) => {
  return (
    <>
      <Heads title={'Home'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <DynamicCatalog data={data} />
      </ContainerGeneral>
      <Footer />
    </>
  );
};

export default catalog;

export async function getServerSideProps({ req, params }) {
  const { id } = params;
  const { token } = req.cookies;
  const response = await getListDetailsCatalog(id);

  if (!token) {
    return {
      redirect: {
        destination: `/login?redirect=https://ocistok.com/catalog/${id}&fullUrl=true`,
        permanent: false,
      },
    };
  }

  if (!response) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: response?.data,
    },
  };
}
