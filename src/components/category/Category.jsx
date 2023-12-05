import { useNavigate } from "react-router-dom";
import { CategoriesData } from "./CategoriesData";

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-wrap justify-between">
      {CategoriesData.map((category, index) => (
        <div
          onClick={() => navigate(`/shop/${category.title.toLowerCase()}`)}
          className="min-w-30 h-80 flex flex-auto items-center justify-center border border-black border-solid mt-0 mx-2 mb-4 cursor-pointer overflow-hidden relative group transition-transform duration-700 ease-in-out transform hover:scale-105"
          key={index}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={category.imgSrc}
            alt="categoryImage"
          />
          <div className="h-24 px-6 flex flex-col items-center justify-center border border-black border-solid bg-white opacity-70 absolute">
            <h3 className="text-4xl font-bold mb-2 text-gray-700">
              {category.title}
            </h3>
            <p className="text-lg font-light">{category.buttonText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
