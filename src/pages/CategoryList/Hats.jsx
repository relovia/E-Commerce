import ProductCard from "../../components/productCard/ProductCard";
import shopData from "../../shopData";

const Hats = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 gap-y-3">
      {shopData.map((category) =>
        category.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Hats;
