import Image from "next/image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "constants/api/member";
import Spinner from "components/Global/Spinner";
import { useRouter } from "next/router";
// import { IconButton } from "@mui/material";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Link from "next/link";

export default function MyWishlist() {
  const router = useRouter();
  const [data, setData] = useState({
    loading: true,
    data: [],
  });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getWishlist()
      .then((res) => {
        if (res.status === 200) {
          setData({ loading: false, data: res.produks });
        } else if (res.status === 401) {
          router.push("/login");
        } else {
          setData({ data: [], loading: false });
        }
      })
      .catch((err) => console.log(err));
  }, [update]);

  const handleRemove = (id, toko) => {
    swal({
      title: "Hapus produk dari wishlist ?",
      text: "Produk yang dihapus tidak dapat kembali",
      buttons: true,
      dangerMode: true,
    }).then(async (submit) => {
      if (submit) {
        const req = await removeWishlist(id, toko);
        if (req?.status == 200) {
          toast.success("Berhasil Menghapus Produk");
        } else {
          toast.error("Gagal Menghapus Produk");
        }
        setUpdate(!update);
      }
    });
  };

  return (
    <div
      className={`pb-10 transition-all duration-300 ${
        !data.loading ? "min-h-36" : "h-32"
      }`}>
      {!data.loading ? (
        data?.data.length > 0 ? (
          data?.data.map((product) => {
            return (
              <div
                key={product.id}
                className='w-full flex px-3 items-center border-b border-gray-200 py-3 bg-white'>
                <div className='w-3/12'>
                  <div className='flex items-center justify-center'>
                    <img src={product?.gambar} className='rounded-md w-24' />
                  </div>
                </div>
                <div className='w-8/12 px-2 max-h-20 self-start'>
                  <Link href={`/product/${product.toko}/${product.link}`}>
                    <a>
                      <p className='text-xs text-justify line-clamp-3'>
                        {product.judul}
                      </p>
                      <span className='text-xs font-bold text-orange-500'>
                        {product.toko}
                      </span>
                    </a>
                  </Link>
                </div>

                <div className='w-1/12 text-right self-start'>
                  <DeleteOutlineIcon
                    onClick={() => handleRemove(product.link, product.toko)}
                    fontSize='small'
                    className='text-red-500'
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-gray-700 mt-5'>
            Data tidak di temukan
          </p>
        )
      ) : (
        <div className='w-full text-center mt-10'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
