import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import DetailProduct from 'components/Product';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import Headnav from 'components/Home/Headnav';

export default function detailTaobao({ id, template }) {
  return (
    <>
      <Heads title={'taobao'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <DetailProduct store='taobao' id={id} />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  // const template = await getTemplate('/product');
  const template = [];
  const { id } = params;
  return {
    props: {
      // template,
      id,
    },
  };
}
