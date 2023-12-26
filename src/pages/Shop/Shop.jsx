import products from "../../shopData.json";
import ProductCard from "../../components/productCard/ProductCard";

const Shop = () => {
  return (
    <>
      <h1 className="text-5xl p-4">Hats</h1>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 gap-y-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Shop;
