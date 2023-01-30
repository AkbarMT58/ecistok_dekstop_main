import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getTrackingOctf } from "constants/api/member";
import router from "next/router";

const index = ({ banner, image, ...restProps }) => {
  const RedirectEventBanner = async () => {
    const redirect =
      "https://www.bigseller.com/alliance/index.htm?affid=365PX4";

    const response = await getTrackingOctf();
    window.open(redirect, "_ blank");
    // console.log("Tracking : ", response?.message);
  };

  return banner ? (
    <Carousel {...restProps} className="w-full h-[450px]">
      <a href="https://ocistok.com/register">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/banner-01.png"
            alt="..."
          />
        </div>
      </a>

      <a href="https://ocistok.com/register">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/bannertahunchina.png"
            alt="..."
          />
        </div>
      </a>

      <a href="https://ocistok.com/search?keyword=lebaran&type=1688">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/banner-lebaran.png"
            alt="..."
          />
        </div>
      </a>

      <div onClick={() => RedirectEventBanner()}>
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/big-seller-ocistok.png"
            alt="big seller ocistok"
          />
        </div>
      </div>

      <a href="https://ocistok.com/search?keyword=peralatan%20hujan&type=1688">
        <div>
          <img
            className="w-full h-[450px]"
            src="/BannerMusimHujan.png"
            alt="..."
          />
        </div>
      </a>

      <a href="https://ocistok.com/register">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/lALPGSWEp8vNRW7NBBLNCcQ_2500_1042-20230117-014100.png"
            alt="..."
          />
        </div>
      </a>

      <a href="https://ocistok.com/register">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/lALPGR5pqkV58C7NBBLNCcQ_2500_1042-20230117-014401.png"
            alt="..."
          />
        </div>
      </a>

      <a href="https://ocistok.com/register">
        <div>
          <img
            className="w-full h-[450px]"
            src="https://ocistok.co.id/control-panel/foto/banner-06.png"
            alt="..."
          />
        </div>
      </a>

      {/* <div onClick={() => RedirectEventBanner()}>
        <div>
          <img
            className='w-full h-[450px]'
            src='https://ocistok.co.id/control-panel/foto/banner_OCTF.JPG'
            alt='...'
          />
        </div>
      </div> */}
    </Carousel>
  ) : (
    <Carousel {...restProps}>
      {image?.map((img, id) => (
        <div key={id}>
          <img
            src={banner ? img.original : img}
            alt=""
            className="rounded-md object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default index;
