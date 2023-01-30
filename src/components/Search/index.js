import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { searchProduct } from "constants/api/product";
import Spinner from "components/Global/Spinner";
import ListProduct from "components/Search/ListProduct";

const Search = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    keyword,
    page = "1",
    type,
    sort,
    start_price,
    end_price,
  } = router.query;
  const TYPE = useSelector((state) => state.searchType.data);

  useEffect(() => {
    setLoading(true);
    if (/<[^>]*>/.test(keyword)) {
      router.push("/404/page");
    }
    if (/<[^>]*>/.test(type)) {
      router.push("/404/page");
    }
    if (keyword) {
      setProduct();
      searchProduct(keyword, type, page, sort, start_price, end_price)
        .then((res) => {
          setProduct(res);

          setLoading(false);
        })
        .catch((err) => {});
    }
  }, [router]);
  return (
    <div className="shadow bg-white rounded-xl mt-10 px-6 py-8">
      <div className="flex -mb-2 text-gray-700 text-sm">
        <p>
          Hasil pencarian untuk
          <span className="ml-1 text-orange-500 capitalize">{keyword}</span>
        </p>
      </div>
      <div className="flex my-8">
        <div className="w-full border-dashed border-b-2"></div>
      </div>
      <div className="flex flex-wrap">
        {loading ? (
          <div className="w-full text-center mt-10">
            <Spinner label="load data" />
          </div>
        ) : product?.data?.produk || product?.data?.produk?.length > 0 ? (
          <ListProduct data={product} />
        ) : (
          <div className="w-full mt-4">
            <p className="text-center text-gray-700">Data tidak di temukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
