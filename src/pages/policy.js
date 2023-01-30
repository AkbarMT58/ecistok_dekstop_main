import Headnav from 'components/Home/Headnav';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Footer from 'components/Layout/Footer';
import Policy from 'components/Policy';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import ContainerGeneral from 'components/Layout/ContainerGeneral';

export default function policy({ template }) {
  return (
    <>
      <Heads title={'Kebijakan Privasi'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <Policy />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // const template = await getTemplate('/policy');

  return {
    props: {
      // template,
    },
  };
}
