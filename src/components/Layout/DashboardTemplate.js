import Header from "components/Layout/Header";
import ListMenu from "./ListMenu";
import Footer from "components/Layout/Footer";
import Headnav from "components/Home/Headnav";

const index = ({ children }) => {
  return (
    <div>
      <Headnav />
      <div className='xl:container mx-auto mt-8'>
        <div className='container-app mx-auto'>
          <Header />
          <div className='flex mt-10'>
            <ListMenu />
            <div className='flex-grow mx-24'>
              <div className='bg-white p-10 rounded-md'>{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
