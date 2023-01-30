import ContainerGeneral from 'components/Layout/ContainerGeneral';
import Header from 'components/Layout/Header';
import About from 'components/AboutUs';
import Footer from 'components/Layout/Footer';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';

const AboutUs = ({ template }) => {
  return (
    <>
      <Heads title={'Tentang Kami '} />
      <ContainerGeneral>
        <Header />
      </ContainerGeneral>
      <About />
      <Footer />
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  // const template = await getTemplate('/faq');
  return {
    props: {
      // template,
    },
  };
}
