import { Tab } from "@headlessui/react";
import InCalculate from "./InCalculate/index";
import WaitPayment from "./WaitPayment";
import { useInquiry } from "hooks/use-inquiry";

export default function MyInquiry() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const {
    cart,
    loading,
    selectCart,
    changeTypeShipping,
    updateQuantity,
    setLoading,
    calculate,
    loadingCalculate,
    count,
    canceled,
    setCount,
    _removeCart,
  } = useInquiry();

  return (
    <div
      className={`w-full transition-all duration-300 ${
        cart ? "min-h-36" : "h-32"
      }`}>
      <Tab.Group>
        <Tab.List className='w-full flex py-2'>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-6/12 text-sm py-2 transition-all duration-300 outline-none",
                selected
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500"
              )
            }>
            Sedang Dihitung
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-6/12 text-sm py-2 transition-all duration-300 outline-none",
                selected
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500"
              )
            }>
            Tunggu Pembayaran
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <InCalculate
              data={calculate}
              isLoading={loadingCalculate}
              count={count}
              setCount={setCount}
              canceled={canceled}
            />
          </Tab.Panel>

          <Tab.Panel>
            <WaitPayment
              cart={cart}
              loading={loading}
              selectCart={selectCart}
              changeTypeShipping={changeTypeShipping}
              updateQuantity={updateQuantity}
              setLoading={setLoading}
              removeCart={_removeCart}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
