import { Tab } from "@headlessui/react";
import Finished from "./Finished";
import OnProgress from "./OnProgress";
import { useOrders } from "hooks/use-orders";
import Refund from "./Refund";

export default function MyOrders() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const {
    hasMore,
    count,
    dataOrder,
    loading,
    open,
    tracking,
    valueChange,
    param,
    loadingTrack,
    setTracking,
    getTrackingOrder,
    setValueChange,
    setOpen,
    setCount,
    setParam,
    getMoreOrder,
  } = useOrders();

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="w-full flex py-2">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-6/12 text-sm py-2 outline-none",
                selected
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500"
              )
            }
          >
            Semua Pesanan
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-6/12 text-sm py-2 outline-none",
                selected
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500"
              )
            }
          >
            Pengembalian Dana
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <OnProgress
              count={count}
              setCount={setCount}
              loading={loading}
              data={dataOrder}
              param={param}
              setParam={setParam}
              getMoreOrder={getMoreOrder}
              hasMore={hasMore}
              open={open}
              setOpen={setOpen}
              tracking={tracking}
              setTracking={setTracking}
              getTrackingOrder={getTrackingOrder}
              setValueChange={setValueChange}
              valueChange={valueChange}
              loadingTrack={loadingTrack}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Refund />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
