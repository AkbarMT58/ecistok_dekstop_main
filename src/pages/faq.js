import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Faq from 'components/Faq';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import ContainerGeneral from 'components/Layout/ContainerGeneral';

function faq({ template }) {
  return (
    <>
      <Heads title={'Frequently Asked Question'} />
      <ContainerGeneral>
        <Header />
        <Faq />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export default faq;

export async function getStaticProps() {
  // const template = await getTemplate('/faq');
  return {
    props: {
      // template,
    },
  };
}
