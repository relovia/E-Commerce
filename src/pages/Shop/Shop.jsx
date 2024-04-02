import shopData from "../../shopData";
import ProductCard from "../../components/productCard/ProductCard";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <>
      <Link to={"./hats"}>
        <h1 className="text-5xl cursor-pointer p-4">Hats</h1>
      </Link>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 gap-y-3">
        {shopData.map((category) =>
          category.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default Shop;
