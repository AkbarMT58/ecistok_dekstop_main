import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchProduct } from "constants/api/product";
import { useRouter } from "next/router";
import CardProduct from "components/Global/CardProduct";
import Spinner from "components/Global/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import { resetTemporaryState } from 'redux/reducers/temporaryProductListSlice';

export default function ListProduct({ data }) {
  const router = useRouter();
  const { keyword, type } = router.query;

  const dispatch = useDispatch();
  const temporaryProductList = useSelector((state) => state.temporaryProductList);
  const {tempProductList, tempAnotherProductList, lastPage, lastKeyword, lastProductIdClicked} = temporaryProductList;

  const [listProduct, setListProduct] = useState(tempProductList?.length > 0 && keyword === lastKeyword ? tempProductList : data?.data?.produk);
  const [anotherListProduct, setAnotherListProduct] = useState(tempAnotherProductList?.length > 0 && keyword === lastKeyword ? tempAnotherProductList : []);
  const [hasMore, setHasMore] = useState(true);
  // const [pages, setPages] = useState({
  //   pages1688: 1,
  //   taobao: 1,
  // });
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [currentType, setCurrentPages] = useState(type);

  useEffect(() => {
    scrollToLastProductSeen().then((message) => {
        localStorage.removeItem('productId')
        dispatch(resetTemporaryState());
        console.log(message)
    }).catch((error) => {
      localStorage.removeItem('productId')
      dispatch(resetTemporaryState());
      console.log(error)
    })
  }, [])

  const scrollToLastProductSeen = () => {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('productId') && tempProductList?.length > 0) {
        document.getElementById(localStorage.getItem('productId'))?.scrollIntoView()
        if (keyword === lastKeyword) {
          setPages(lastPage)
        }
        resolve('oke')
      } else {
        reject('no temporary product list')
      }
    })
  }

  const getMoreProduct = async () => {
    setLoading(true);

    // if (type === "1688") {
    const currentPage = Number(pages?.pages1688);

    const result = await searchProduct(keyword, type, pages + 1);
    if (result?.status === 429) {
      setTimeout(() => {
        getMoreProduct();
      }, 1000);
    } else if (result?.status === 200) {
      // setPages({
      //   ...pages,
      //   pages1688: pages?.pages1688 + 1,
      // });
      setPages((prev) => prev + 1);
      setLoading(false);
      setListProduct((listProduct) => [...listProduct, ...result.data.produk]);
    } else {
      setHasMore(false);
      setLoading(false);
      setPages(1);
      getAlternativeProducts(1);
    }
    // else {
    //   getMoreProductTaobao(1);
    //   // setCurrentPages("taobao");
    // }
    // }
    // else {
    //   getMoreProductTaobao();
    // }
  };

  // const getMoreProductTaobao = async (startPage) => {
  //   console.log("taobaoo");
  //   const currentPages = pages?.taobao;
  //   const result = await searchProduct(
  //     keyword,
  //     "taobao",
  //     startPage ? startPage : currentPages + 1
  //   );
  //   console.log("hasill", result);
  //   if (result?.status === 429) {
  //     setTimeout(() => {
  //       getMoreProduct();
  //     }, 1000);
  //   } else if (result?.status === 200) {
  //     console.log("taobaoo 2");
  //     setLoading(false);
  //     setListProduct((listProduct) => [...listProduct, ...result.data.produk]);
  //     setPages({
  //       ...pages,
  //       taobao: startPage ? startPage : currentPages + 1,
  //     });
  //   } else {
  //     setHasMore(false);
  //     setLoading(false);
  //     setPages(1);
  //     getAlternativeProducts(1)
  //   }
  // };

  const getAlternativeProducts = async (startPage) => {
    setLoading(true);

    const alternativeType = type == "1688" ? "taobao" : "1688";

    const result = await searchProduct(
      keyword,
      alternativeType,
      startPage ? startPage : pages + 1
    );

    if (result?.status === 429) {
      setTimeout(() => {
        getAlternativeProducts();
      }, 1000);
    } else if (result?.status === 200) {
      setLoading(false);
      setAnotherListProduct((anotherListProduct) => [
        ...anotherListProduct,
        ...result.data.produk,
      ]);
      setHasMore(true);
      setPages((prev) => prev + 1);
    } else {
      setHasMore(false);
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6 overflow-hidden">
        {listProduct?.map((item, i) => (
          <CardProduct
            key={i}
            id={item.id_produk}
            image={item.gambar}
            title={item.produk}
            price={item.harga}
            wishlist={item.wishlist}
            type={type}
            url={`/product/${type}/${item.id_produk}`}
            listProduct={listProduct}
            pages={pages}
            keyword={keyword}
            anotherListProduct={anotherListProduct}
          />
        ))}
      </div>

      {anotherListProduct?.length > 0 && (
        <div className="pt-10 border-t-2 border-dashed mt-10">
          <p>
            Pilihan Lainnya dari Pencarian{" "}
            <span className="text-orange-500">{keyword}</span> Product{" "}
            <span className="text-orange-500">
              {type === "1688" ? "Taobao" : "1688"}
            </span>{" "}
          </p>
          <div className="grid grid-cols-4 gap-6 overflow-hidden">
            {anotherListProduct?.map((item, i) => (
              <CardProduct
                key={i}
                id={item.id_produk}
                image={item.gambar}
                title={item.produk}
                price={item.harga}
                wishlist={item.wishlist}
                type={type === "1688" ? "taobao" : "1688"}
                url={`/product/${type === "1688" ? "taobao" : "1688"}/${item.id_produk}`}
                listProduct={listProduct}
                pages={pages}
                keyword={keyword}
                anotherListProduct={anotherListProduct}
                isAnotherList={true}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-8">
        {loading ? (
          <div className="text-center">
            <Spinner label="Memuat Produk" />
          </div>
        ) : !hasMore ? (
          <div className="text-center">
            Tidak Ada Produk Yang ditampilkan lagi
          </div>
        ) : (
          <button
            onClick={() => {
              anotherListProduct?.length > 0
                ? getAlternativeProducts()
                : getMoreProduct();
            }}
            className="bg-orange-500 text-2xl text-white px-6 py-2 rounded-md hover:scale-110 duration-300"
          >
            Tampilkan Lebih Banyak
          </button>
        )}
      </div>
    </div>
  );
}
