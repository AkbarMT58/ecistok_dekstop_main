import Headnav from "components/Home/Headnav";
import Header from "components/Layout/Header";
import Navbar from "components/Home/Navbar";
import Footer from "components/Layout/Footer";
import Search from "components/Search";
import Heads from "components/Heads";
import ContainerGeneral from "components/Layout/ContainerGeneral";
import BannerCariProduct from "components/Global/BannerCariProduct";
import { getTemplate } from "constants/api/template";

function search({ template, keyword }) {
  return (
    <>
      <Heads title={keyword} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <BannerCariProduct classNameLayout="mt-5" />
        <Search />
      </ContainerGeneral>
      <Footer />
    </>
  );
}

export default search;

export async function getServerSideProps({ query }) {
  const { keyword } = query;
  const pattern =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  if (pattern.test(keyword)) {
    if (/1688/.test(keyword)) {
      const split = keyword.split("?");
      const url = split[0].split("/");
      const idProduct = url.pop().split(".")[0];

      return {
        redirect: {
          destination: `/product/1688/${idProduct}`,
          permanent: false,
        },
      };
    }

    if (/taobao/.test(keyword) || /tmall/.test(keyword)) {
      if (/ocistok/.test(keyword)) {
        const split = keyword.split("?");
        const url = split[0].split("/");
        const idProduct = url.pop().split(".")[0];

        return {
          redirect: {
            destination: `/product/taobao/${idProduct}`,
            permanent: false,
          },
        };
      } else {
        const split = keyword.match(/[\\?|\\&]id=([^&]*)/);
        if (split === null) {
          const url = keyword.split("/");
          const idProduct = url.pop().split(".")[0];

          return {
            redirect: {
              destination: `/product/taobao/${idProduct}`,
              permanent: false,
            },
          };
        } else {
          return {
            redirect: {
              destination: `/product/taobao/${split[1]}`,
              permanent: false,
            },
          };
        }
      }
    }

    if (/m.alibaba/.test(keyword)) {
      const split = keyword.split("/");
      const idProduct = split[4];

      return {
        redirect: {
          destination: `/product/alibaba/${idProduct}`,
          permanent: false,
        },
      };
    }

    if (/indonesian.alibaba/.test(keyword)) {
      const split = keyword.split("?");
      const url = split[0].split("/");
      const productName = url.pop().split(".");
      const splitProductName = productName[productName.length - 2];
      const idProduct = splitProductName.split('-').pop();

      return {
        redirect: {
          destination: `/product/alibaba/${idProduct}`,
          permanent: false,
        },
      };
    }

    if (/alibaba/.test(keyword)) {
      const split = keyword.split("?");
      const url = split[0].split("/");
      const productName = url.pop().split(".")[0];
      const splitProductName = productName.split(/[_-]/);
      const idProduct = splitProductName.pop();

      return {
        redirect: {
          destination: `/product/alibaba/${idProduct}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      keyword,
    },
  };
}
