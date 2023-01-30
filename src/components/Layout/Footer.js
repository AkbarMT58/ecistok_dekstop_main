import { Tab } from "@headlessui/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AlamatKantor from "data/alamat.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const support = [{}];

export default function Footer() {
  let [support] = useState({
    payment: [
      "/bri-logo.png",
      "/bca.png",
      "/mandiri.png",
      "/alfamidi.png",
      "/permata.png",
      "/bni.png",
      "/alfamart.png",
      "/gopay.png",
      "/ShopeePay.png",
      "/ovo.svg",
      "/linkaja.svg",
      "/dana.svg",
      "/visa.jpg",
    ],
    logistic: ["/SiCepat.png", "/sentralcargo.png"],
  });

  return (
    <>
      <footer className="mt-20">
        <div className="flex">
          <div className="w-full bg-white py-10 px-6">
            <h2 className="text-lg text-gray-700 text-center">
              PEMBAYARAN & EKSPEDISI
              <br />
              DISUPPORT OLEH :
            </h2>

            <Tab.Group as="div" className="text-center mt-6">
              <Tab.List className="flex justify-center space-x-6 h-11">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "py-2.5 px-6 text-md leading-5 font-medium text-white rounded-full",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60",
                      selected
                        ? "bg-orange-300 shadow"
                        : "text-orange-400 border border-orange-400 hover:bg-white/[0.12] hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
                    )
                  }
                >
                  Pembayaran
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "py-2.5 px-6 text-md leading-5 font-medium text-white rounded-full",
                      "focus:outline-none focus:ring-2 ring-white ring-opacity-60",
                      selected
                        ? "bg-orange-300 shadow"
                        : "text-orange-400 border border-orange-400 hover:bg-white/[0.12] hover:text-orange-500 hover:border-b-2 hover:border-orange-500"
                    )
                  }
                >
                  Ekspedisi
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-6">
                {/* Image Payment/Pembayaran */}
                <Tab.Panel>
                  <ul className="flex justify-center space-x-3">
                    {support.payment.map((i) => (
                      <li key={i}>
                        <Image
                          src={i}
                          width={83}
                          height={35}
                          alt="jasa import barang dari china"
                        />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
                {/* Image Ekspedisi */}
                <Tab.Panel>
                  <ul className="flex justify-center space-x-3">
                    {support.logistic.map((i) => (
                      <li key={i}>
                        <Image
                          src={i}
                          width={83}
                          height={35}
                          alt="jasa import barang dari china"
                        />
                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-red-500 py-10 px-10">
          <div className="flex justify-center">
            <div className="w-3/12">
              <Image
                src="/logo_oci_new_1.svg"
                height={50}
                width={200}
                alt="logo"
              />
            </div>
            <div className="w-2/12">
              <p className="text-sm text-white font-bold">AKUN SAYA</p>
              <ul className="mt-3">
                <li className="text-sm text-white">Keranjang</li>
                <li className="text-sm text-white">Hubungi Kami</li>
              </ul>
            </div>
            <div className="w-2/12">
              <p className="text-sm text-white font-bold">TENTANG KAMI</p>
              <ul className="mt-3">
                <li className="text-sm text-white">
                  <Link href="/terms">
                    <a>Syarat & Ketentuan</a>
                  </Link>
                </li>
                <li className="text-sm text-white">
                  <Link href="/refund-policy">
                    <a>Kebijakan Refund</a>
                  </Link>
                </li>
                <li className="text-sm text-white">
                  <Link href="/policy">
                    <a>Kebijakan Privasi</a>
                  </Link>
                </li>
                <li className="text-sm text-white">
                  <Link href="/about-us">
                    <a>Tentang Ocistok</a>
                  </Link>
                </li>
                <li className="text-sm text-white">
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </li>
                <li className="text-sm text-white">
                  <Link href="/faq">
                    <a>FAQ</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-3/12">
              <p className="text-sm text-white font-bold">LOKASI KAMI</p>
              <ul className="mt-3">
                <li className="text-sm text-white">
                  {AlamatKantor[0]?.alamat}
                </li>
                {/* <li className="text-sm text-white">021-22301522</li> */}
                <li className="text-sm text-white">021-50867088</li>
                <li className="text-sm text-white">info@ocistok.com</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex flex-col items-center">
              <p className="text-md text-white font-bold ">
                Follow Akun Media Sosial Kita
              </p>
              <div className="flex items-center justify-center space-x-5 text-white mt-2">
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="https://wa.me/6281210001808"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="mailto:info@ocistok.com"
                >
                  <EmailIcon />
                </a>
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="https://www.facebook.com/PTOCI/?modal=admin_todo_tour"
                >
                  <FacebookIcon />
                </a>
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="https://www.instagram.com/ocistok"
                >
                  <InstagramIcon />
                </a>
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="https://www.youtube.com/channel/UCDHwQp2QjJ0O1GmsvdExO3Q"
                >
                  <YouTubeIcon />
                </a>
                <a
                  target="_blank"
                  className="border p-2 rounded-full"
                  href="https://id.linkedin.com/company/ocistok-com"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            <ul className="pt-6 text-white text-center">
              <li>Layanan Pengaduan Konsumen</li>
              <li>PT. Ocommerce Capital Indonesia</li>
              <li>Email: info@ocistok.com</li>
              <li>
                Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga
              </li>
              <li>Kementerian Perdagangan Republik Indonesia</li>
              <li>Whatsapp Ditjen PKTN: 0853 1111 1010</li>
            </ul>
          </div>
        </div>
        <div className="bg-white flex py-6">
          <p className="w-full text-gray-500 text-center">
            Copyright © PT Ocommerce Capital Indonesia.
          </p>
        </div>
      </footer>
    </>
  );
}

{
  /* <a
          href="https://wa.me/6281210001808"
          target="_blank"
          className="border p-2 rounded-full"
        >
          <i class="fa fa-whatsapp" aria-hidden="true"></i>
        </a> */
}
