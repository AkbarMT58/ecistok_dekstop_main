import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import formatFullDate from "helpers/formatFullDate";
import { KeyboardArrowUpIcon } from "components/Global/Icons";
import { KeyboardArrowDownIcon } from "components/Global/Icons";
import { IconButton } from "@mui/material";
import Image from 'next/image'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ListRefund = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [viewVideoWrapper, setViewVideoWrapper] = useState(false)
  const [videoLink, setVideoLink] = useState('')

  const videoUrl = item.Bukti.filter((v) => v.jenis === 'video')
  const linkUrl = item.Bukti.filter((v) => v.jenis === 'link')
  const photoUrl = item.Bukti.filter((v) => v.jenis === 'gambar')
  const photoUrlList = photoUrl.map((v) => v.url)
  
  return (
    <div className='w-full mt-2 py-2 bg-white'>
      <div>
        <p className='text-lg font-semibold text-gray-700'>
          No Pesanan : {item.id_so}
        </p>
        <p className='text-sm text-gray-700'>
          Tanggal :{" "}
          <span className='font-semibold'>{formatFullDate(item.tanggal)}</span>
        </p>
        <>
          <hr className='my-2' />
          <Collapse in={checked}>
            {item.RefundProduk.map((variant, i) => {
              return (
                <div key={i} className='flex mt-3 space-x-1'>
                  <div className='w-3/12'>
                    <img
                      src={ variant.sku == '111' ? '/cargo-gray.svg' :
                        variant.gambar.length > 0
                          ? variant.gambar
                          : "/default-image.png"
                      }
                      className='w-full h-24 object-contain'
                    />
                  </div>
                  <div className='w-9/12 text-xs'>
                    <p className='line-clamp-2 font-semibold text-gray-700'>
                      {variant.sku}
                    </p>
                    <p className='text-gray-500 line-clamp-1'>
                      Variant : <b>{variant.produk}</b>
                    </p>
                    <p className='text-gray-500 line-clamp-1'>
                      Qty : <b>{variant.kuantiti}</b>
                    </p>
                  </div>
                </div>
              );
            })}
          </Collapse>
          <div
            onClick={() => setChecked(!checked)}
            className='text-orange-500  cursor-pointer flex items-center justify-center space-x-1'>
            <p className='text-center text-sm '>
              {checked ? "Sembunyikan" : "Tampilkan"} Produk
            </p>
            {checked ? (
              <IconButton>
                <KeyboardArrowUpIcon className='text-orange-500' />
              </IconButton>
            ) : (
              <IconButton>
                <KeyboardArrowDownIcon className='text-orange-500' />
              </IconButton>
            )}
          </div>
        </>
        <hr className='my-2' />

        <div className='flex justify-between items-center'>
          <p className='text-gray-700'>Dana Dikembalikan :</p>
          <p className='text-red-500 font-semibold'>
            Rp. {item.jumlah.toLocaleString("ID-id")}
          </p>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <p className='text-gray-700'>Status Refund :</p>
          <p
            className={`${
              item.status === "completed"
                ? "text-green-500"
                : item.status === "rejected"
                ? "text-red-500"
                : "text-yellow-500"
            }`}>
            {item.status}
          </p>
        </div>
        <hr className='my-2' />
        <p className='font-semibold text-gray-700'>Alasan</p>
        <p className='text-gray-700 capitalize'>{item.alasan}</p>
        <hr className='my-2' />
        <p className='font-semibold text-gray-700'>Bukti</p>
        {videoUrl?.length !== 0 &&
          <>
            <div className='flex text-sm mb-2'>
              <div className="w-[5rem] font-semibold text-gray-700">Video</div>
              <div className="mr-1">:</div>
              <div className="bukti">
                {videoUrl.map((bukti, index) => (
                  <div key={index} className="list-bukti line-clamp-1 hover:font-semibold cursor-pointer" onClick={() => {
                    setVideoLink(bukti.url)
                    setViewVideoWrapper(true)
                  }}                  
                  >{videoUrl?.length > 1 && "-"} {bukti.url}</div>
                  ))}
              </div>
            </div>
            {viewVideoWrapper &&
              <div 
              className="video-wrapper fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-900 bg-opacity-75"
              onClick={() => {
                setVideoLink('')
                setViewVideoWrapper(false)
              }}
              >
                <video width="500" height="360" controls>
                  <source src={videoLink} type={`video/${videoLink?.split(".").pop()}`} />
                  <source src="movie.ogg" type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              </div>
            }
          </>
        }
        {linkUrl?.length !== 0 &&
          <div className='flex text-sm mb-2'>
            <div className="w-[5rem] font-semibold text-gray-700">Link</div>
            <div className="mr-1">:</div>
            <div className="bukti">
              {linkUrl.map((bukti, index) => (
                <a key={index} href={bukti.url} target="_blank" className="list-bukti line-clamp-1 hover:font-semibold cursor-pointer">{linkUrl?.length > 1 && "-"} {bukti.url}</a>
                ))}
            </div>
          </div>
        }
        {photoUrl?.length !== 0 &&
          <>
            <div className='flex text-sm mb-2'>
              <div className="w-[5rem] font-semibold text-gray-700">Gambar</div>
              <div className="mr-1">:</div>
              <div className="bukti flex gap-x-2" onClick={() => setOpenPhoto(true)}>
                {photoUrl?.map((bukti, index) => (
                  <img key={index} 
                  src={bukti.url} 
                  width={80} 
                  height={80} 
                  // fill 
                  // objectFit='cover' 
                  className="object-cover object-center hover:scale-110 cursor-pointer" />
                  ))}
              </div>
            </div>
            {openPhoto && (
              <Lightbox
              mainSrc={photoUrlList[photoIndex]}
              nextSrc={photoUrlList[(photoIndex + 1) % photoUrlList.length]}
              prevSrc={photoUrlList[(photoIndex + photoUrlList.length - 1) % photoUrlList.length]}
              onCloseRequest={() => setOpenPhoto(false)}
              onMovePrevRequest={() => setPhotoIndex((photoIndex + photoUrlList.length - 1) % photoUrlList.length)}
              onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photoUrlList.length)}
              />
            )}
          </>
        }

        <hr className='my-2' />
        <p className='font-semibold text-gray-700'>Detail Pengembalian</p>
        <hr className='my-2' />
        <div className='flex justify-between items-center mt-2'>
          <p className='text-gray-700'>Nama :</p>
          <p className='text-gray-500'>{item?.nama}</p>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <p className='text-gray-700'>Nama Bank :</p>
          <p className='text-gray-500 uppercase'>{item.bank}</p>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <p className='text-gray-700'>Nomor Rekening :</p>
          <p className='text-gray-500'>{item.rekening}</p>
        </div>
      </div>
    </div>
  );
};

export default ListRefund;
