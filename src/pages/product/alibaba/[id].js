import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import DetailProduct from 'components/Product';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';

import Headnav from 'components/Home/Headnav';

export default function detailAlibaba({ id, template }) {
  return (
    <>
      <Heads title={'alibaba'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <DetailProduct store='alibaba' id={id} />
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
