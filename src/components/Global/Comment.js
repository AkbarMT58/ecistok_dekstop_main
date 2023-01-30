import Spinner from "components/Global/Spinner";
import { getComment, postComment } from "constants/api/member";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IconButton, CameraAltIcon } from "components/Global/Icons";

const Comment = ({ id }) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [update, setUpdate] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [filename, setFilename] = useState("");

  const _getComment = async () => {
    setLoading(true);
    const response = await getComment(id);
    if (response.status === 200) {
      setComment(response.data);
    } else {
      setComment([]);
    }
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingButton(true);
    const payload = {
      id: String(id),
      note: inputComment,
      image:
        filename.trim().length > 0
          ? "https://ocistok.co.id/control-panel/foto/" + filename
          : filename,
    };
    const response = await postComment(JSON.stringify(payload));
    if (response.status === 200) {
      toast.success("Berhasil Menambahkan Komentar");
      setInputComment("");
      setFilename("");
      setUpdate(!update);
    } else {
      toast.error(response.message);
    }
    setLoadingButton(false);
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
        setFilename(result.file);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    _getComment();
  }, [id, update]);

  return (
    <div className='container mx-auto w-full'>
      <p className='font-semibold text-lg text-gray-700'>Tambah Komentar</p>
      <hr className='my-2' />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-2'>
          <label>Isi Komentar</label>
          <textarea
            className='p-2 border border-gray-500 w-full rounded-md'
            rows={4}
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}></textarea>
        </div>
        <input
          className='hidden'
          accept='image/*'
          id='icon-button-file'
          type='file'
          onChange={handleUpload}
        />
        <label htmlFor='icon-button-file'>
          <IconButton aria-label='upload picture' component='span'>
            <CameraAltIcon />
          </IconButton>
          {filename.trim().length > 0 && <span>{filename}</span>}
        </label>
        <div className='text-center mt-3'>
          <button
            disabled={loadingButton}
            type='submit'
            className={`${
              loadingButton ? "bg-gray-500" : "bg-orange-500"
            } text-white rounded-md px-4 py-1`}>
            Kirim
          </button>
        </div>
      </form>
      <hr className='my-2' />
      {loading ? (
        <div className='w-full text-center'>
          <Spinner />
        </div>
      ) : comment.length > 0 ? (
        comment.map((item, i) => {
          return (
            <div key={i} className='w-full border-b py-2'>
              <div className='flex mb-2 justify-between text-gray-900'>
                <p className='font-semibold line-clamp-1'>{item.user}</p>
                <p className='line-clamp-1'>{item.date}</p>
              </div>
              {item.image.trim().length > 0 && (
                <img src={item.image} width={70} height={70} />
              )}
              <p className='mt-1 text-gray-500'>{item.note}</p>
            </div>
          );
        })
      ) : (
        <p className='mt-5 text-center'>Tidak ada komentar</p>
      )}
    </div>
  );
};

export default Comment;
