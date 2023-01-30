import Headnav from 'components/Home/Headnav';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Hero from 'components/Home/Hero';
import BannerHero from 'components/Home/BannerHero';
import ProductPopuler from 'components/Home/ProductPopuler';
import Footer from 'components/Layout/Footer';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import FirstPopup from 'components/Home/FirstPopup';
import BannerCariProduct from 'components/Global/BannerCariProduct';
import { BannerTerintegrasi } from 'components/Global/GlobalBanner';

function Home({ template }) {
  return (
    <>
      <Heads title={'Home'} />
      <Headnav />
      <ContainerGeneral>
        <FirstPopup />
        <Header />
        <Navbar />
        <Hero template={template} />
        <BannerHero />
        <ProductPopuler />
        <BannerTerintegrasi />
        <BannerCariProduct classNameLayout='mt-5' />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export default Home;

export async function getStaticProps() {
  // const template = await getTemplate('/');
  const template = [];

  return {
    props: {
      template,
    },
  };
}
