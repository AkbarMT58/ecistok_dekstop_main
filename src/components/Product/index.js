import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Skeleton from "react-loading-skeleton";
import ImageCarousel from "components/Global/ImageCarousel";
import useProduct from "hooks/use-product";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Collapse from "@mui/material/Collapse";
import RequestInquiryModal from "components/DetailProduct/RequestInquiryModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  FavoriteIcon,
  WhatsAppIcon,
  ExpandMoreIcon,
  ExpandLessIcon,
  IconButton,
  CameraAltIcon,
} from "components/Global/Icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import GetAppIcon from "@mui/icons-material/GetApp";
import { addWishlist, removeWishlist } from "constants/api/member";
import users from "helpers/users";
import SectionService from "components/Product/SectionService";
import convertRupiah from "helpers/convertRupiah";
import BreadCrumb from "./BreadCrumb";

const options = {
  stopOnHover: true,
  infiniteLoop: true,
  useKeyboardArrows: true,
  showIndicators: false,
  showThumbs: true,
  autoPlay: true,
  showStatus: false,
  dynamicHeight: true,
};

const DetailProduct = ({ store, id, res }) => {
  const [collapse, setCollapse] = useState(false);
  const [images, setImages] = useState([]);
  const [showList, setShowList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgDesc, setImgDesc] = useState("");
  const router = useRouter();
  const [keterangan, setKeterangan] = useState("");
  const [userIsLogin, setUserIslogin] = useState(false);

  useEffect(() => {
    if (users().userName) {
      setUserIslogin(users().isLogin);
    }
  }, []);

  const {
    fetchProduct,
    selectVariant,
    handleQty,
    productState: { data, isLoading, variant, childVariant, selectedVariant },
  } = useProduct();

  const handleFavorite = async (type) => {
    if (type === "add") {
      const payload = {
        judul: data.title,
        gambar: data.image ? data.image : data.item_imgs[0],
        link: `${data.num_iid}`,
        toko: data.type,
      };
      const req = await addWishlist(JSON.stringify(payload));
      if (req?.status == 200) {
        toast.success("Berhasil menambahkan wishlist");
        setIsFavorite(!isFavorite);
      }
    } else {
      const req = await removeWishlist(id, data.type);
      if (req?.status == 200) {
        toast.success("Berhasil menghapus dari wishlist");
        setIsFavorite(!isFavorite);
      }
    }
  };

  const totalDataProduct = () => {
    let totalPrice = 0;
    let totalQty = 0;
    let products = [];
    if (selectedVariant) {
      for (let i = 0; i < selectedVariant.length; i++) {
        totalQty += selectedVariant[i].total;
        for (let j = 0; j < selectedVariant[i].children.length; j++) {
          totalPrice +=
            (data?.diskon?.length > 1
              ? data?.diskon?.find((diskon) => diskon.is_active).value
              : selectedVariant[i].children[j].harga) *
            selectedVariant[i].children[j].qty;
          products.push({
            nameParent: selectedVariant[i].valueidn,
            nameChild: selectedVariant[i].children[j].variantIdn,
            qty: selectedVariant[i].children[j].qty,
          });
        }
      }
    }
    return { products, totalPrice, totalQty };
  };

  const downloadImage = async () => {
    let urlDownload = "https://ocistok.co.id/download.php?";
    await data?.item_imgs?.map((item) => {
      urlDownload += "gambar[]=" + item + "&";
    });
    router.push(urlDownload);
  };

  const handleUpload = async (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      let formData = new FormData();
      formData.append("gambar", file[0]);
      const response = await fetch(process.env.URL_UPLOAD, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === 200) {
        setImgDesc(result.file);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    if(data) {
      const tempImageReplacer = data.item_imgs ? data.item_imgs : [data.PropSku[0].url]
      setImages(tempImageReplacer);
      setIsFavorite(data.wishlist ? data.wishlist : false);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      const getDataProduct = async () => {
        const response = await fetchProduct(id, store);
        if (response) {
          toast.error("Produk Telah Di Hapus Oleh Suplier");
          router.push("/");
        }
      };
      getDataProduct(id);
    }
  }, [router]);
  
  if(!data) {
    return null
  }
  return (
    <div className="space-y-5">
      <BreadCrumb title={data?.title} />
      <div className="w-full h-full p-10 rounded-md flex bg-white mt-2">
        {isLoading ? (
          <div className="flex space-x-5 w-full">
            <div className="flex flex-col items-center">
              <Skeleton width={450} height={400} />
              <div className="flex px-4 py-2 space-x-3 mt-3">
                <Skeleton className="test" width={70} height={70} />
                <Skeleton width={70} height={70} />
                <Skeleton width={70} height={70} />
                <Skeleton width={70} height={70} />
              </div>
            </div>
            <div className="flex flex-col flex-grow md:-pl-10 test">
              <Skeleton width={800} height={70} />
              <Skeleton width={800} height={100} />
              <Skeleton width={100} height={30} />
              <Skeleton width={800} height={50} />
            </div>
          </div>
        ) : (
          <div className="flex w-full min-h-[500px]">
            <div className="px-3">
              <ImageCarousel
                className="h-32 w-96"
                image={images}
                {...options}
              />
            </div>
            <div className="px-4 w-full flex-grow">
              <div className="bg-white">
                <h1 className="text-sm text-gray-700 text-justify font-bold uppercase">
                  {data?.title}
                </h1>
              </div>
              <div className="flex mt-3 justify-center items-center border border-orange-400 bg-orange-100 text-gray-600 px-6 py-4 rounded-md shadow-md">
                <p className="text-sm">
                  HARGA PRODUK BELUM TERMASUK PAJAK DAN ONGKOS KIRIM
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                {isLoading ? (
                  <Skeleton height={20} width={75} />
                ) : (
                  data?.diskon?.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <p
                          className={`text-md font-bold  ${
                            item.is_active ? "text-marron-500" : "text-gray-500"
                          }`}
                        >
                          Rp.
                          {convertRupiah(Number(item?.value)).toLocaleString(
                            "id-ID"
                          )}
                        </p>
                        <span className="text-gray-500 text-sm">
                          ≥{item.kuantiti} item
                        </span>
                      </div>
                    );
                  })
                )}
                <div className="flex items-center space-x-2">
                  <a
                    onClick={downloadImage}
                    className="flex items-center text-center bg-orange-500 px-2 py-1 rounded-md cursor-pointer"
                  >
                    <GetAppIcon className="text-white" />
                    <p className="text-xs text-white">Unduh Gambar</p>
                  </a>
                  {userIsLogin ? (
                    isFavorite ? (
                      <FavoriteIcon
                        fontSize="small"
                        className="text-red-400"
                        onClick={() => handleFavorite("remove")}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        fontSize="small"
                        className="text-red-400"
                        onClick={() => handleFavorite("add")}
                      />
                    )
                  ) : (
                    <Link href={`/login?redirect=/product/${store}/${id}`}>
                      <FavoriteBorderIcon
                        fontSize="small"
                        className="cursor-pointer text-red-400"
                      />
                    </Link>
                  )}
                </div>
              </div>
              <hr className="my-2" />
              {data?.variant?.length === 1 ? (
                <div>
                  <p className="text-sm">Pilih Variant :</p>
                  <div className="w-full grid 2xl:grid-cols-7 lg:grid-cols-5 p-1 rounded-md gap-5">
                    {variant?.map((img, i) => (
                      <div
                        key={i}
                        onClick={(e) => {
                          selectVariant(e, img.properties);
                          if (img?.url) {
                            setImages([img?.url]);
                          } else {
                            setImages(data.item_imgs);
                          }
                        }}
                        className={`text-center rounded-md py-2 border-4 transiton-all duration-300 border-gray-900 flex flex-col justify-center cursor-pointer ${
                          img.isSelected &&
                          "bg-white ring ring-orange-500 border-none"
                        }`}
                      >
                        {img?.url ? (
                          <>
                            <Image
                              src={img.url}
                              height={60}
                              width={60}
                              className="rounded-md"
                              objectFit="cover"
                              alt="jasa import barang dari china"
                            />
                            <p className="pointer-events-none text-gray-900 text-xs line-clamp-2 capitalize">
                              {img?.valueidn}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-900 text-xs line-clamp-1 capitalize">
                            {img?.valueidn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 w-full">
                    <div
                      className={`py-2 relative bg-white rounded-md transiton-all duration-300 space-y-3 flex-grow variant-scroll`}
                    >
                      {childVariant?.children?.map((e, id) => {
                        return (
                          <div
                            key={id}
                            className="relative bg-gray-100 w-full border-2 border-sky-500 p-1 rounded-lg"
                          >
                            <div
                              className={`w-full${
                                data?.diskon?.length > 1
                                  ? "grid-cols-2 "
                                  : "grid-cols-3"
                              }`}
                            >
                              <p className="font-semibold p-1 line-clamp-2">
                                {e?.variantIdn}
                              </p>
                              {data?.diskon?.length > 1 ? null : (
                                <p className="font-semibold p-1 text-orange-500">
                                  Rp.{" "}
                                  {(e?.harga * 2350).toLocaleString("id-ID")}
                                </p>
                              )}
                              <div className="absolute right-2 p-1 bottom-1">
                                <RemoveOutlinedIcon
                                  fontSize="small"
                                  className="text-white bg-orange-500 rounded-l-md"
                                  onClick={() =>
                                    handleQty(
                                      e?.id_product,
                                      e?.properties,
                                      e?.qty > 0 ? e?.qty - 1 : 0
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  className="w-10 h-[20px] ml-px mr-px text-xs focus:outline-none text-white bg-orange-500 text-center"
                                  onChange={(event) =>
                                    handleQty(
                                      e?.id_product,
                                      e?.properties,
                                      event.target.value
                                    )
                                  }
                                  value={e?.qty}
                                />
                                <AddOutlinedIcon
                                  onClick={() =>
                                    handleQty(
                                      e?.id_product,
                                      e?.properties,
                                      e?.qty + 1
                                    )
                                  }
                                  fontSize="small"
                                  className="text-white bg-orange-500 rounded-r-md"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                data?.variant?.length === 2 && (
                  <div>
                    <p className="text-sm">Pilih Variant :</p>
                    <div className="w-full grid 2xl:grid-cols-7 lg:grid-cols-5 p-1 rounded-md gap-5">
                      {variant?.map((img, i) => (
                        <div
                          key={i}
                          onClick={(e) => {
                            selectVariant(e, img.properties);
                            if (img?.url) {
                              setImages([img?.url]);
                            } else {
                              setImages(data.item_imgs);
                            }
                          }}
                          className={`flex flex-col space-y-2 items-center justify-center text-center rounded-md py-2 border-4 transiton-all duration-300 border-gray-900  cursor-pointer ${
                            img.isSelected &&
                            "bg-white ring ring-orange-400 border-none"
                          }`}
                        >
                          {img?.url ? (
                            <>
                              <Image
                                src={img.url}
                                height={60}
                                width={60}
                                className="rounded-md"
                                objectFit="cover"
                                alt="jasa import barang dari china"
                              />
                              <p className="pointer-events-none text-gray-900 text-xs line-clamp-2 capitalize">
                                {img?.valueidn}
                              </p>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <p className="text-gray-900 text-xs line-clamp-2 capitalize">
                                {img?.valueidn}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 w-full ">
                      <div
                        className={`py-2 bg-white overflow-y-scroll rounded-md transiton-all duration-300 space-y-3 flex-grow variant-scroll`}
                      >
                        {childVariant?.children?.slice(0, 3)?.map((e, id) => {
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between w-full"
                            >
                              <div className="relative bg-gray-100 w-full border-2 border-sky-500 p-1 rounded-lg">
                                <p className="font-semibold p-1 line-clamp-2">
                                  {e?.variantIdn}
                                </p>
                                {data?.diskon?.length > 1 ? null : (
                                  <p className="font-semibold p-1 text-orange-500">
                                    Rp.{" "}
                                    {(e?.harga * 2350).toLocaleString("id-ID")}
                                  </p>
                                )}

                                <div className="absolute right-2 p-1 bottom-1">
                                  <RemoveOutlinedIcon
                                    fontSize="small"
                                    className="text-white bg-orange-500 rounded-l-md"
                                    onClick={() =>
                                      handleQty(
                                        e?.id_product,
                                        e?.properties,
                                        e?.qty > 0 ? e?.qty - 1 : 0
                                      )
                                    }
                                  />
                                  <input
                                    type="number"
                                    className="w-10 h-[20px] ml-px mr-px text-xs focus:outline-none text-white bg-orange-500 text-center"
                                    onChange={(event) =>
                                      handleQty(
                                        e?.id_product,
                                        e?.properties,
                                        event.target.value
                                      )
                                    }
                                    value={e?.qty}
                                  />
                                  <AddOutlinedIcon
                                    onClick={() =>
                                      handleQty(
                                        e?.id_product,
                                        e?.properties,
                                        e?.qty + 1
                                      )
                                    }
                                    fontSize="small"
                                    className="text-white bg-orange-500 rounded-r-md"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {childVariant?.children
                          ?.slice(3, childVariant?.children?.length)
                          ?.map((e, id) => {
                            return (
                              <Collapse
                                in={collapse}
                                timeout="auto"
                                unmountOnExit
                                key={id}
                                className="flex items-center justify-between w-full"
                              >
                                {collapse && (
                                  <div className="relative bg-gray-100 w-full border-2 border-sky-500 p-1 rounded-lg">
                                    <p className="font-semibold p-1">
                                      {e?.variantIdn}
                                    </p>
                                    {data?.diskon?.length > 1 ? null : (
                                      <p className="font-semibold p-1 text-orange-500">
                                        Rp.{" "}
                                        {(e?.harga * 2350).toLocaleString(
                                          "id-ID"
                                        )}
                                      </p>
                                    )}

                                    <div className="absolute right-2 p-1 bottom-1">
                                      <RemoveOutlinedIcon
                                        fontSize="small"
                                        className="text-white bg-orange-500 rounded-l-md"
                                        onClick={() =>
                                          handleQty(
                                            e?.id_product,
                                            e?.properties,
                                            e?.qty > 0 ? e?.qty - 1 : 0
                                          )
                                        }
                                      />
                                      <input
                                        type="number"
                                        className="w-10 h-[20px] ml-px mr-px text-xs focus:outline-none text-white bg-orange-500 text-center"
                                        onChange={(event) =>
                                          handleQty(
                                            e?.id_product,
                                            e?.properties,
                                            event.target.value
                                          )
                                        }
                                        value={e?.qty}
                                      />
                                      <AddOutlinedIcon
                                        onClick={() =>
                                          handleQty(
                                            e?.id_product,
                                            e?.properties,
                                            e?.qty + 1
                                          )
                                        }
                                        fontSize="small"
                                        className="text-white bg-orange-500 rounded-r-md"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Collapse>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )
              )}

              {childVariant?.children?.length > 3 && (
                <div className="text-center mb-2">
                  <button
                    onClick={() => setCollapse(!collapse)}
                    className="text-orange-500 hover:text-orange-700 transition-all duration-300"
                  >
                    {!collapse ? "Lihat lebih banyak" : "Lihat lebih sedikit"}
                    {!collapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </button>
                </div>
              )}

              {selectedVariant && (
                <div className="relative">
                  <div className="flex items-center justify-between bg-gray-100 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-red-500 font-semibold  border-r-2 pr-3 border-gray-300">
                        {totalDataProduct().totalQty} Produk
                      </p>
                      <p className="text-red-500 font-semibold pl-3 border-gray-300">
                        Rp.{" "}
                        {(totalDataProduct().totalPrice * 2350).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                    <div
                      className="flex items-center space-x-2"
                      onClick={() => setShowList(!showList)}
                    >
                      <p className="text-gray-500 cursor-pointer">
                        List Produk
                      </p>
                      <IconButton>
                        {showList ? (
                          <KeyboardArrowUpIcon
                            fontSize="small"
                            className="text-gray-500"
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            fontSize="small"
                            className="text-gray-500"
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <Collapse in={showList} timeout="auto" unmountOnExit>
                    <div>
                      {totalDataProduct()?.products?.map((data, id) => (
                        <div key={id} className="flex font-semibold">
                          <div className="w-2/3 p-3 border border-gray-200">
                            <p className="">
                              {`${
                                data.nameParent.slice(0, 1).toUpperCase() +
                                data.nameParent.slice(1)
                              }, ${data.nameChild}`}
                            </p>
                          </div>
                          <div className="w-1/3 p-3 border border-gray-200 ">
                            ({data.qty}) Produk
                          </div>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}

              <div className="mt-3 flex flex-col">
                <label>Keterangan :</label>
                <textarea
                  type="text"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="border border-gray-300 p-2 w-full h-32 outline-none focus:ring ring-gray-300"
                />
                <div className="mt-3 flex items-center">
                  <label htmlFor="icon-button-file">
                    <input
                      className="hidden"
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleUpload}
                    />
                    <IconButton aria-label="upload picture" component="span">
                      <CameraAltIcon />
                    </IconButton>
                  </label>
                  <div className="line-clamp-1 font-normal ml-2">{imgDesc}</div>
                </div>
              </div>
              <div className="flex mt-3 space-x-4">
                <a
                  target="_blank"
                  href={
                    "https://api.whatsapp.com/send?text=saya%20tertarik%20dengan%20produk%20ini%20%20" +
                    data.detail_url +
                    "&phone=6281210001808"
                  }
                  className="py-1 px-4  border border-orange-600 bg-orange-500 text-white rounded-md hover:text-white  hover:bg-orange-400  transition-all duration-300 space-x-2 flex items-center"
                >
                  <WhatsAppIcon />
                  <span>Hubungi Sales</span>
                </a>

                <RequestInquiryModal
                  totalDataProduct={totalDataProduct}
                  selectedVariant={selectedVariant}
                  data={data}
                  keterangan={keterangan}
                  setKeterangan={setKeterangan}
                  gambar_keterangan={imgDesc}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <SectionService />

      <div className="relative bg-white p-10 rounded-md shadow-md">
        <div className="absolute top-0 bg-orange-500 py-3 px-5 text-white rounded-b-md">
          Deskripsi
        </div>
        <div
          className="mt-5 flex flex-col items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: `${data?.desc ? data?.desc : ""}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DetailProduct;
