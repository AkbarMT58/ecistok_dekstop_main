import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import Headnav from 'components/Home/Headnav';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import HowTo from 'components/HowToShop';
import { BannerTerintegrasi } from 'components/Global/GlobalBanner';
import BannerCariProduct from 'components/Global/BannerCariProduct';

const HowToShop = ({ template }) => {
  return (
    <>
      <Heads title={'Cara Belanja'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
      </ContainerGeneral>
      <HowTo />
      <BannerTerintegrasi isRoundedNo={true} />
      <ContainerGeneral>
        <BannerCariProduct classNameLayout='mt-5' />
      </ContainerGeneral>
      <Footer />
    </>
  );
};

export default HowToShop;

export async function getStaticProps() {
  // const template = await getTemplate('/');

  return {
    props: {
      // template,
    },
  };
}
