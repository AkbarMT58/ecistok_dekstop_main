import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import MyWishlist from "components/Orders/MyWishlist";
import MyInquiry from "components/Orders/MyInquiry";
import MyOrders from "components/Orders/MyOrders";

export default function Orders({ path }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }

    if (path) {
      let arrPath = ["wishlist", "inquiry", "myorders"];
      setIndex(arrPath.findIndex((arrPath) => arrPath === path));
    }
  }, [router]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className='max-w-3xl min-w-[700px] mx-auto'>
      <Tab.Group defaultIndex={index}>
        <Tab.List className='flex py-4 bg-white'>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-4/12 text-gray-700 text-sm pb-2 transition-all duration-200 outline-none",
                selected ? "border-b-4 border-orange-400" : ""
              )
            }>
            Daftar Keinginan
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-4/12 text-gray-700 text-sm pb-2 transition-all duration-200 outline-none",
                selected ? "border-b-4 border-orange-400" : ""
              )
            }>
            Pengajuan Saya
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-4/12 text-gray-700 text-sm pb-2 transition-all duration-200 outline-none",
                selected ? "border-b-4 border-orange-400" : ""
              )
            }>
            Pesanan Saya
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <MyWishlist />
          </Tab.Panel>
          <Tab.Panel>
            <MyInquiry />
          </Tab.Panel>
          <Tab.Panel>
            <MyOrders />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
