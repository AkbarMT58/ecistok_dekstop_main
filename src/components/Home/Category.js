import { useState } from "react";
import { useSelector } from "react-redux";
import { selectType } from "redux/reducers/searchSlice";
import { useRouter } from "next/router";
import listCategory from "data/categoy.json";
import Image from "next/image";
import LoadableImage from "components/Global/LoadableImage";

const Category = ({ onShow }) => {
  const { data } = listCategory;
  const [show, setShow] = useState(false);
  const [subCategory, setSubCategory] = useState(data[0]?.child);
  const selector = useSelector(selectType);
  const router = useRouter();

  const changeCategory = (id) => {
    const index = data.findIndex(function (item, i) {
      return item._id === id;
    });
    setSubCategory(data[index]?.child);
  };

  return (
    <div
      className='w-full absolute z-10 mt-2'
      onMouseLeave={() => {
        onShow(false);
        document.body.style.overflowY = "scroll";
      }}>
      <div className='flex h-96'>
        <div
          className={`category-scroll w-36 space-y-5 overflow-y-scroll flex flex-col bg-gray-200 py-2  px-5 ${
            show ? "rounded-l-md" : "rounded-md"
          }`}>
          {data.map((e) => {
            return (
              <div
                key={e._id}
                onMouseEnter={() => {
                  changeCategory(e._id);
                  setShow(true);
                }}
                className='flex flex-col items-center cursor-pointer'>
                <LoadableImage
                  src={e.image}
                  height={50}
                  width={50}
                  alt={e.display_name}
                />
                <p className='text-xs text-center'>{e.display_name}</p>
              </div>
            );
          })}
        </div>
        {show && (
          <div className='category-scroll w-full bg-white overflow-y-scroll p-5  py-8 rounded-r-md'>
            <div className='grid grid-cols-6 gap-6'>
              {subCategory?.map((category) => {
                return (
                  <div
                    key={category._id}
                    onClick={() => {
                      document.body.style.overflowY = "scroll";
                      onShow(false);
                      router.push(
                        `/search?keyword=${category.display_name}&type=${selector}`
                      );
                    }}
                    className='w-40 cursor-pointer'>
                    <div className='text-center'>
                      <LoadableImage
                        src={category.image}
                        height={50}
                        width={50}
                        alt={category.display_name}
                      />
                      <p className='text-xs text-center'>
                        {category.display_name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Category;
