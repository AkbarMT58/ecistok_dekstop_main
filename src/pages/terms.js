import Headnav from 'components/Home/Headnav';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Footer from 'components/Layout/Footer';
import Terms from 'components/Terms';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import ContainerGeneral from 'components/Layout/ContainerGeneral';

export default function terms({ template }) {
  return (
    <>
      <Heads title={'Syarat & Ketentuan'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <Terms />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // const template = await getTemplate('/terms');

  return {
    props: {
      // template,
    },
  };
}
