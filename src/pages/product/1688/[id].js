import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import DetailProduct from 'components/Product';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import Headnav from 'components/Home/Headnav';

export default function detail1688({ id, template }) {
  return (
    <>
      <Heads title={'1688'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <DetailProduct store='1688' id={id} />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  // const template = await getTemplate('/product');
  const { id } = params;

  return {
    props: {
      // template,
      id,
    },
  };
}
