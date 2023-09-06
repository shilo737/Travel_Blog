import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import usePosts from "../../../hooks/usePosts";
import { ADD_POST, UPLOAD_IMAGE } from "../../../constant/url";
import { apiPost } from "../../../services/services";
import Resizer from "react-image-file-resizer";
import { country } from "../../apis/country";

const AddPost = ({ setAddPost }) => {
  const { error, addNewPosts } = usePosts();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (resizedImage) => {
          resolve(resizedImage);
        },
        "blob",
        500,
        500,

        (error) => {
          reject(error);
        }
      );
    });
  };

  const onSub = async (_bodyData) => {
    console.log(_bodyData);
    try {
      let mainImageUrl = '';
      let imagesUrls = [];
  
      if (_bodyData.main_image && _bodyData.main_image.length > 0) {
        const mainImageFile = _bodyData.main_image[0];
        const mainImage = await resizeImage(mainImageFile);
        const mainImageData = await getBase64Data(mainImage);
        const mainImageDataResult = await apiPost(UPLOAD_IMAGE, { myFile: mainImageData });
        mainImageUrl = mainImageDataResult.data.secure_url;
      }
  
      if (_bodyData.images && _bodyData.images.length > 0) {
        const imagesArray = Array.from(_bodyData.images);
        const img = await resizeImage(imagesArray[0]);
        const imgPromises = imagesArray.map(async (image) => {
          const resizedImage = await resizeImage(image);
          if (resizedImage && img) {
            const imgData = await getBase64Data(resizedImage);
            const data = await apiPost(UPLOAD_IMAGE, { myFile: imgData });
            return data.data.secure_url;
          }
        });
        imagesUrls = await Promise.all(imgPromises);
      }
  
      const updatedBodyData = { ..._bodyData, main_image: mainImageUrl, images: imagesUrls };
      
      if (!error && (mainImageUrl || imagesUrls.length > 0)) {
        addNewPosts(updatedBodyData);
        setAddPost(false);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getBase64Data = (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSub)}
        className="bg-blue-500 rounded-3xl pt-6 pb-8  p-4 font-bold"
      >
        <div className="flex justify-center">
          <p className="text-3xl italic font-serif font-bold text-white mb-4">
            Create your dream blog
          </p>
        </div>
        <div className="mb-">
          <label className="block text-white text-lg font-bold mb-2">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter Title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Country
          </label>
          <select className="border font-bold text-sm text-black rounded block w-full p-2.5 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          {...register("location")}>
            {country.map((con,i)=>(
              <option value={con} key={i}>{con}</option>
        
            ))}


          </select>
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter Country"
            {...register("location", { required: true })}
          /> */}
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Main Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="file"
            accept="image/*"
            placeholder="Enter image URL"
            {...register("main_image", { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Continent
          </label>
          <select
            {...register("category")}
            className="border font-bold text-sm text-black rounded block w-full p-2.5 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="north america">North America</option>
            <option value="south america">South America</option>
            <option value="antarctica">Antarctica</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-white text-lg font-bold mb-2">
            Description
          </label>
          <textarea
            rows="7"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            More Images
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="file"
            accept="image/*"
            multiple
            {...register("images", { required: true })}
          />
        </div>

        <div className="flex items-center w-fit mx-auto">
          <button
            className="bg-blue-700 mx-2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
          <button
            onClick={() => setAddPost(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;

