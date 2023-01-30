import Headnav from 'components/Home/Headnav';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Footer from 'components/Layout/Footer';
import RefundPolicy from 'components/RefundPolicy';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import ContainerGeneral from 'components/Layout/ContainerGeneral';

export default function refundPolicy({ template }) {
  return (
    <>
      <Heads title={'Kebijakan Refund'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <RefundPolicy />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // const template = await getTemplate('/refund-policy');

  return {
    props: {
      // template,
    },
  };
}
